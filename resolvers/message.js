import { PubSub, withFilter } from 'apollo-server-express';
import requiresAuth from '../permissions';

const pubsub = new PubSub();
const NEW_CHANNEL_MESSAGE = 'NEW_CHANNEL_MESSAGE';

export default {
    Query: {
        messages: requiresAuth.createResolver(async (parent, { channelId }, { models }) =>
            models.message.findAll(
                { order: [['created_at', 'DESC']], where: { channelId } },
                { raw: true },
            )),
    },
    Subscription: {
        newChannelMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
                (payload, args) => {
                    return (payload.newChannelMessage.channelId === args.channelId);
                },
            ),
        },
    },
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
            try {
                const message = await models.message.create({
                    ...args,
                    userId: user.id,
                });

                const asyncFunc = async () => {
                    const currentUser = await models.user.findOne({
                        where: {
                            id: user.id,
                        },
                    });

                    pubsub.publish(NEW_CHANNEL_MESSAGE, {
                        channelId: args.channelId,
                        newChannelMessage: {
                            ...message.dataValues,
                            user: currentUser.dataValues,
                        },
                    });
                };

                asyncFunc();

                return true;
            } catch (err) {
                console.log([err]);
                return false;
            }
        }
    },
    Message: {
        user: ({ user, userId }, args, { models }) => {
            if (user) {
                return user;
            }
            return models.user.findOne({ where: { id: userId } }, { raw: true });
        },
    },
};
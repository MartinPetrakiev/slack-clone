import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        messages: requiresAuth.createResolver(async (parent, { channelId }, { models }) =>
            models.message.findAll(
                { order: [['created_at', 'ASC']], where: { channelId } },
                { raw: true },
            )),
    },
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
            try {
                await models.message.create({
                    ...args,
                    userId: user.id,
                });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    },
    Message: {
        user: ({ userId }, args, { models }) =>
            models.user.findOne({ where: { id: userId } }, { raw: true }),
    },
};
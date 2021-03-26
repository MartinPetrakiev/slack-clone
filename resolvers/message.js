import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        getChannelMessages: async (parent, args, { models }) =>
            models.message.findAll({ channelId: args.channelId }),
    },
    Mutation: {
        createMessage: async (paranet, args, { models, user }) => {
            try {
                await models.message.create({ ...args, userId: 1 });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    },
    Message: {
        user: ({ id }, args, { models }) => models.findAll({userId: id}),
        channel: ({ id }, args, { models }) => models.findAll({channelId: id}),
    }
};
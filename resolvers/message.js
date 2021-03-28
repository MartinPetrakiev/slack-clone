import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {

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
        user: (parent, args, { models }) => models.user.findOne({id: parent.userId}),
        channel: (parent, args, { models }) => models.channel.findOne({id: parent.channelId}),
    }
};
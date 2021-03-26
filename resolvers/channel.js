import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        allChannels: requiresAuth.createResolver(async (parent, args, { models }) =>
        models.channel.findAll({ teamId: 1 }, { raw: true })),
    },
    Mutation: {
        createChannel: async (paranet, args, {models}) => {
            try {
                const channel = await models.channel.create(args);
                return {
                    ok: true,
                    channelData: channel,
                };
            } catch(err) {
                console.log(err);
                return {
                    ok: true,
                    errors: formatErrors(err)
                };
            }
        }
    }
};
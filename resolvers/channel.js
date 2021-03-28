import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        allChannels: requiresAuth.createResolver(async (parent, args, { models }) =>
            models.channel.findAll({ where: { teamId: args.teamId } }, { raw: true })),
        getChannel: async (parent, args, { models }) =>
            models.channel.findOne({ where: { channelKey: args.channelKey } }, { raw: true }),
    },
    Mutation: {
        createChannel: async (paranet, args, { models }) => {
            try {
                const channel = await models.channel.create(args);
                console.log(channel);
                return {
                    ok: true,
                };
            } catch (err) {
                console.log(err);
                return {
                    ok: true,
                    errors: formatErrors(err)
                };
            }
        }
    },
    Channel: {
        messages: async ({ id }, args, { models }) => {
            try {
                const messages = await models.message.findAll({ where: { channelId: Number(id) } });
                return messages;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
};
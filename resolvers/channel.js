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
        createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
              const team = await models.team.findOne({ where: { id: args.teamId } }, { raw: true });
              if (team.owner !== user.id) {
                return {
                  ok: false,
                  errors: [
                    {
                      path: 'name',
                      message: 'You have to be the owner of the team to create channels',
                    },
                  ],
                };
              }
      
              const channel = await models.channel.create(args);
              return {
                ok: true,
                channel,
              };
            } catch (err) {
              console.log(err);
              return {
                ok: false,
                errors: formatErrors(err, models),
              };
            }
          }),
    },
    Channel: {
        messages: async ({ id }, args, { models }) => {
            try {
                const messages = await models.message.findAll({ where: { channelId: Number(id) } });
                return messages;
            } catch (error) {
                console.log(error);
                return {
                    ok: false,
                    errors: formatErrors(error)
                };
            }
        },
    },
};
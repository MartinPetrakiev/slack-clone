import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        allTeams: async (parent, args, { models }) =>
            models.team.findAll({ owner: 1 }, { raw: true }),
        getTeam: requiresAuth.createResolver(async (parent, args, { models }) =>
        models.team.findOne({ where: { id: args.id } }, { raw: true })),
    },
    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                await models.team.create({ ...args, owner: user.id });
                console.log(user);
                return {
                    ok: true
                };
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err)
                };
            }
        }),
    },
    Team: {
        channels: ({id}, args, { models }) => models.channel.findAll({teamId: id}),
    }
};
import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
            models.team.findAll({ where: { owner: 1} }, { raw: true })),
        getTeam: requiresAuth.createResolver(async (parent, { teamKey }, { models }) =>
            models.team.findOne({ where: { teamKey: teamKey } }, { raw: true })),
    },
    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                const team = await models.team.create({ ...args, owner: user.id });
                await models.channel.create({ name: 'General', public: true, teamId: team.id });
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
        channels: ({ id }, args, { models }) => models.channel.findAll({where: { teamId: id }}),
    }
};
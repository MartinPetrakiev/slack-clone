import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
    Query: {
        allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
            models.team.findAll({ where: { owner: user.id } }, { raw: true })),
        getTeam: requiresAuth.createResolver(async (parent, { teamKey }, { models }) =>
            models.team.findOne({ where: { teamKey: teamKey } }, { raw: true })),
    },
    Mutation: {
        createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                await models.team.create({ ...args, owner: user.id });
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
        channels: ({ id }, args, { models }) => models.channel.findAll({ teamId: id }),
    }
};
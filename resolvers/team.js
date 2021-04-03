import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';
import sequelize from '../models/index';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;
export default {
    Query: {
        // allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) =>
        //     models.team.findAll({
        //         where: {
        //             [Op.or]: [{ owner: user.id, }, { "$users.id$": user.id, },],
        //         },
        //         include: [{ model: models.user, },],
        //     })),
        getTeam: requiresAuth.createResolver(async (parent, { teamKey }, { models }) =>
            models.team.findOne({ where: { teamKey: teamKey } }, { raw: true })),
    },
    Mutation: {
        addTeamMember: requiresAuth.createResolver(async (parent, { email, teamId, admin }, { models, user }) => {
            try {
                if (!admin) {
                    return {
                        ok: false,
                        errors: [{ path: 'email', message: 'You cannot add members to the team' }],
                    };
                }
                const teamPromise = models.team.findOne({ where: { id: teamId } }, { raw: true });
                const userToAddPromise = models.user.findOne({ where: { email } }, { raw: true });
                const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise]);
                if (!userToAdd) {
                    return {
                        ok: false,
                        errors: [{ path: 'email', message: 'Could not find user with this email' }],
                    };
                }
                await models.member.create({ userId: userToAdd.id, teamId, admin: false });
                return {
                    ok: true,
                };
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        }),
        createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                const response = await sequelize.transaction(async () => {
                    const team = await models.team.create({ ...args });
                    await models.channel.create({ name: 'General', public: true, teamId: team.id });
                    await models.member.create({ teamId: team.id, userId: user.id, admin: true });
                    return team;
                });
                return {
                    ok: true,
                    team: response,
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
    Team: {
        channels: ({ id }, args, { models }) => models.channel.findAll({ where: { teamId: id } }),
        admin: async ({ id }, args, { models, user }) => {
            try {
                const [member] = await models.member.findAll({ where: { userId: user.id, teamId: id } });
                if(member.dataValues.admin){
                    return true;
                }
                return false;
            } catch (error) {
                console.log([error]);
                return false;
            }
            
        },
    }
};
import { tryLogin } from '../auth';
import formatErrors from '../formatErrors';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.user.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.user.findAll(),
    },
    Mutation: {
        login: async (parent, { email, password }, { models, SECRET, SECRET2 }) => tryLogin(email, password, models, SECRET, SECRET2),
        register: async (parent, args, { models }) => {
            try {
                const user = await models.user.create(args);
                return {
                    ok: true,
                    user
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        },
    },
    User: {
        teams: (parent, args, { models, user }) =>
            models.team.findAll({
                where: {
                    [Op.or]: [{ owner: user.id, }, { "$users.id$": user.id, },],
                },
                include: [{ model: models.user, },],
            })
    }

};
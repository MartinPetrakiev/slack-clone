import { tryLogin } from '../auth';
import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';
import { Sequelize } from 'sequelize';
import sequelize from '../models/index';
const Op = Sequelize.Op;

export default {
    Query: {
        getUser: (parent, args, { models, user }) =>
            models.user.findOne({ where: { id: user.id } }),
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
        addTtitle: requiresAuth.createResolver(async (parent, args, { models, user }) => {
            try {
                const userData = await models.user.findOne({ where: { id: user.id } });
                userData.title = args.title;
                userData.save();
                return {
                    ok: true
                };
            } catch (err) {
                return {
                    ok: false,
                    errors: formatErrors(err, models),
                };
            }
        }),
    },
    User: {
        teams: async (parent, args, { models, user }) => {
            const promise = await sequelize.query(
                'select * from teams as team join members as member on team.id = member.team_id where member.user_id = ?',
                {
                    replacements: [user.id],
                    model: models.team,
                },
            );
            promise[0].dataValues.teamKey = promise[0].dataValues.team_key;
            return promise;
        }

    },

};
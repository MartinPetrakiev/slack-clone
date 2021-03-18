import bcrypt from 'bcrypt';
import { ValidationError } from 'sequelize'; 
import _ from 'lodash';

const formatErrors = (e, models) => {
    if (e instanceof ValidationError) {
        // _.pick({a: 1, b: 2}, 'a') => {a: 1}
        return e.errors.map(x => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong' }];
};

export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.user.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.user.findAll(),
    },
    Mutation: {
        register: async (parent, { password, ...otherArgs }, { models }) => {
            try {
                if (password.length < 5) {
                    return {
                        ok: false,
                        errors: [{path: 'password', message: 'The password needs to be longer than 5 charachters.'}]
                    }
                }
                const hash = bcrypt.hashSync(password, 10);
                const user = await models.user.create({ ...otherArgs, password: hash });
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

};
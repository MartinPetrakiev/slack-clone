import bcrypt from 'bcrypt';
export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.user.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.user.findAll(),
    },
    Mutation: {
        register: async (parent, { password, ...otherArgs }, { models }) => {
            try {
                const hash = bcrypt.hashSync(password, 10);
                const user = await models.user.create({ ...otherArgs, password: hash });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
    },

};
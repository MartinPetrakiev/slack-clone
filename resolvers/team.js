import formatErrors from '../formatErrors';

export default {
    Mutation: {
        createTeam: async (parent, args, { models, user }) => {
            try {
                await models.team.create({ ...args, owner: user.id });
                console.log(user);
                return {
                    ok: true
                }
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err)
                };
            }
        }
    }
};
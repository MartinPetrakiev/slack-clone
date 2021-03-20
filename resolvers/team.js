import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';

export default {
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
};
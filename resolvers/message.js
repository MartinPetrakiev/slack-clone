export default {
    Mutation: {
        createMessage: async (paranet, args, {models, user}) => {
            try {
                await models.message.create({...args, userId: user.id});
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }
};
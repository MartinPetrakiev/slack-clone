export default {
    Mutation: {
        createChannel: async (paranet, args, {models}) => {
            try {
                await models.channel.create(args);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    }
};
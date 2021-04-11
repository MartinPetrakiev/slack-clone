import formatErrors from '../formatErrors';
import requiresAuth from '../permissions';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

export default {
  Query: {
    allChannels: requiresAuth.createResolver(async (parent, args, { models }) =>
      models.channel.findAll({ order: [['id', 'ASC']], where: { teamId: args.teamId } }, { raw: true })),
    getChannel: async (parent, args, { models }) =>
      models.channel.findOne({ where: { channelKey: args.channelKey } }, { raw: true }),
    findChannels: async (parent, args, { models }) =>
      models.channel.findAll({ where: { name: { [Op.like]: '%' + args.name + '%' }, teamId: args.teamId } }, { raw: true }),
  },
  Mutation: {
    createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        if (!args.admin) {
          return {
            ok: false,
            errors: [
              {
                path: 'name',
                message: 'You don\'t have administrator privilages',
              },
            ],
          };
        }
        const channel = await models.channel.create(args);
        return {
          ok: true,
          channel,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
    addTopic: requiresAuth.createResolver(async (parent, args, { models }) => {
      try {
        const channel = await models.channel.findOne({ where: { id: args.channelId } }, { raw: true });
        channel.topic = args.topic;
        await channel.save();
        return {
          ok: true
        };
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
  },
  Channel: {
    messages: async ({ id }, args, { models }) => {
      try {
        const messages = await models.message.findAll({ where: { channelId: Number(id) } });
        return messages;
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          errors: formatErrors(error)
        };
      }
    },
  },
};
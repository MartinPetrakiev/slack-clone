function applyExtraSetup(sequelize) {
	const { user, team, message, channel } = sequelize.models;

	user.belongsToMany(team, {
		through: 'member',
		foreignKey: 'userId'
	});
	user.belongsToMany(team, {
		through: 'channel_member',
		foreignKey: 'userId'
	});
	team.belongsToMany(user, {
		through: 'member',
		foreignKey: 'teamId'
	});
	team.belongsTo(user, {
		foreignKey: {
			name: 'owner'
		}
	});
	message.belongsTo(channel, {
		foreignKey: 'channelId'
	});
	message.belongsTo(user, {
		foreignKey: 'userId'
	});
	channel.belongsTo(team, {
		foreignKey: 'teamId'
	});
	channel.belongsToMany(user, {
		through: 'channel_member',
		foreignKey: 'channelId'
	});

}

export { applyExtraSetup };
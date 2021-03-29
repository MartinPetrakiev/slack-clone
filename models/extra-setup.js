function applyExtraSetup(sequelize) {
	const { user, team, message, channel, member } = sequelize.models;

	user.belongsToMany(team, {
		through: member,
		foreignKey: {
			name: 'userId',
			field: 'user_id',
		},
	});
	user.belongsToMany(channel, {
		through: 'channel_member',
		foreignKey: {
			name: 'userId',
			field: 'user_id',
		},
	});
	team.belongsToMany(user, {
		through: member,
		foreignKey: {
			name: 'teamId',
			field: 'team_id',
		},
	});
	team.belongsTo(user, {
		foreignKey: 'owner',
	});
	message.belongsTo(channel, {
		foreignKey: {
			name: 'channelId',
			field: 'channel_id',
		},
	});
	message.belongsTo(user, {
		foreignKey: {
			name: 'userId',
			field: 'user_id',
		},
	});
	channel.belongsTo(team, {
		foreignKey: {
			name: 'teamId',
			field: 'team_id',
		},
	});
	channel.belongsToMany(user, {
		through: 'channel_member',
		foreignKey: {
			name: 'channelId',
			field: 'channel_id',
		},
	});

}

export { applyExtraSetup };
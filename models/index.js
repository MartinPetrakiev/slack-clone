import Sequelize from 'sequelize';
import { applyExtraSetup } from './extra-setup';

const sequelize = new Sequelize('slack', 'postgres', 'HowdySir1!', {
    dialect: 'postgres',
	define: {
		underscored: true,
	}
});

const modelDefiners = [
	require('./user').User,
	require('./team').Team,
	require('./channel').Channel,
	require('./message').Message,
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
export default sequelize;
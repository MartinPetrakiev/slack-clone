# Slack-Clone--SoftUni
 
Slack-Clone is SPA meant to mimic original Slack communication platform features.

# Architecture

<img src="./App-Architecture.jpg" width="400px" /><br>

# Set up and usage

**Database**

For database the application uses PostgreSQL. 
Before running in development mode install PostgreSQL for appropriate OS [link](https://www.postgresql.org/download/).

**Server**

The server runs on Node.js and a Sequelize instance is used to create models for database.

This code snippet setups the Sequelize instance.
```js
import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', password, {
    dialect: 'postgres',
	define: {
		underscored: true,
	}
});

export default sequelize;
```

A documentation for Sequelize can be found [here](https://sequelize.org/master/).

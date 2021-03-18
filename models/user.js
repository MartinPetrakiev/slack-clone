import { DataTypes } from 'sequelize';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export function User(sequelize) {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: "The username can only contain letters and numbers."
                },
                len: {
                    args: [3, 25],
                    msg: "The username needs to be between 3 and 25 charachters."
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
        },
    });
    return User;
};
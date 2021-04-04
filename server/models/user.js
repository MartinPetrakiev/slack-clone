import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export function User(sequelize) {
    const User = sequelize.define('user', {
        userKey: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
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
        title: {
            type: DataTypes.STRING,
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
            validate: {
                len: {
                    args: [5, 100],
                    msg: "The password needs to be between 5 and 100 charachters."
                }
            }
        },
    },
        {
            hooks: {
                afterValidate: async (user) => {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                }
            }
        });
    return User;
};
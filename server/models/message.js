import { DataTypes } from 'sequelize';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export function Message(sequelize) {
    const Message = sequelize.define('message', {
        msgKey: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        text: {
            type: DataTypes.STRING,
        },
    });
    return Message;
};
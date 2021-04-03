import { DataTypes } from 'sequelize';

export function Member(sequelize) {
  const Member = sequelize.define('member', {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  });

  return Member;
};
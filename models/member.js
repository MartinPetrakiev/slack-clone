import { DataTypes } from 'sequelize';

export function Member(sequelize) {
  const Member = sequelize.define('member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
  });

  return Member;
};
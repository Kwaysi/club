'use strict';
module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define(
    'groups',
    {
      name: DataTypes.STRING,
      members: DataTypes.INTEGER,
      desc: DataTypes.STRING,
      admin: DataTypes.INTEGER,
    },
    {},
  );
  groups.associate = function (models) {
    // associations can be defined here
  };
  return groups;
};

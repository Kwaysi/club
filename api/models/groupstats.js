'use strict';
module.exports = (sequelize, DataTypes) => {
  const groupstats = sequelize.define(
    'groupstats',
    {
      users: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {},
  );
  groupstats.associate = function (models) {
    // associations can be defined here
    models.groupstats.belongsTo(models.groups);
  };
  return groupstats;
};

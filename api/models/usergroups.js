'use strict';
module.exports = (sequelize, DataTypes) => {
  const usergroups = sequelize.define(
    'usergroups',
    {
      isAdmin: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {},
  );
  usergroups.associate = function (models) {
    // associations can be defined here
    models.usergroups.belongsTo(models.user);
    models.usergroups.belongsTo(models.groups);
  };
  return usergroups;
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pets', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    birth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'pets'
  });
};

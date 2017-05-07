/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mytables', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: true
    }
  }, {
    tableName: 'mytables'
  });
};

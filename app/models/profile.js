'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Profile.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    detail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  user.associate = function (models) {
    Profile.belongsTo(models.Profile, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return Profile;
};
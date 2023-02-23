'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sample.belongsTo(models.Profile, { foreignKey: 'profileId' })
    }
  }
  Sample.init({
    MRN: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sampleNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cellLine: {
      type: DataTypes.ENUM('In Process', 'Finished', 'Failed', 'N/A'),
      defaultValue: 'N/A',
      allowNull: false,
    },
    PDXModel: {
      type: DataTypes.ENUM('In Process', 'Finished', 'Failed', 'NA'),
      defaultValue: 'N/A',
      allowNull: false
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: 'Profiles',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Sample',
  });
  return Sample;
};
import { Sequelize, DataTypes, Model } from 'sequelize';

export default function (sequelize: Sequelize): typeof Model {
  class Subtask extends Model {
    static associate(models: any) {
      Subtask.belongsTo(models.Todo, { foreignKey: 'TodoId' });
    }
  }

  Subtask.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      TodoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Subtask',
      tableName: 'Subtasks',
    }
  );

  return Subtask;
}

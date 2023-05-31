import { DataTypes, Model, Sequelize } from 'sequelize';

export default function (sequelize: Sequelize): typeof Model {
  class Todo extends Model {
    static associate(models: any) {
      Todo.hasMany(models.Subtask, { foreignKey: 'TodoId' });
    }
  }

  Todo.init(
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
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'Todos',
  }
  );

  return Todo;
}

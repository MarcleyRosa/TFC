import { Model, DataTypes } from 'sequelize';
import db from '.';
import Matche from './Matche.model';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  modelName: 'teams',
  timestamps: false,
});

Matche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Matche, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Matche, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Team;

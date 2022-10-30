import sequelize from '../db';
import  { Optional, Model, DataType, DataTypes } from 'sequelize';
import { useRecord } from 'adminjs';

interface IGames {
    id: Number,
    name: string,
    plataforms: number,
    createdAt: Date,
    updatedAt: Date
}

export type GamesCreationAttributes = Optional<IGames, 'id'>;

export class Games extends Model<IGames, GamesCreationAttributes>{
    declare id: Number;
    declare name: string;
    declare plataforms: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Games.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plataforms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'plataforms',
            key: 'id'
        }
        
    },
    createdAt: {
        type: DataTypes.DATE    
    },
    updatedAt: {
        type: DataTypes.DATE
    },

}, {
    sequelize,
    tableName: 'games',
    modelName: 'games'
})
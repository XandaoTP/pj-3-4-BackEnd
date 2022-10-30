import sequelize from '../db';
import  { Optional, Model, DataType, DataTypes } from 'sequelize';
import { useRecord } from 'adminjs';

interface IPlataforms {
    id: Number,
    name: string,
    createdAt: Date,
    updatedAt: Date
}

export type PlataformsCreationAttributes = Optional<IPlataforms, 'id'>;

export class Plataforms extends Model<IPlataforms, PlataformsCreationAttributes>{
    declare id: Number;
    declare name: string;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Plataforms.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE    
    },
    updatedAt: {
        type: DataTypes.DATE
    },

}, {
    sequelize,
    tableName: 'plataforms',
    modelName: 'plataforms'
})
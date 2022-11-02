import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../../db'

interface IUser{
    id: number;
    name: string;
    email: string;
    username: string;
    encryptedPassword: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserCreateAttributes = Optional<IUser, 'id'>

export class Users extends Model<IUser, UserCreateAttributes> {
   declare id: number | null;
   declare name: string | null;
   declare email: string | null;
   declare username: string | null;
   declare encryptedPassword: string ;
   declare role: string | null;
   declare createdAt: Date | null;
   declare updatedAt: Date | null;
}

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true           
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(70),
            allowNull: false
            },
        username: {
            type: DataTypes.STRING(128),
            allowNull: false
            },
        encryptedPassword: {
            type: DataTypes.STRING(128),
            allowNull: false
            },
        role: {
            type: DataTypes.ENUM('admin', 'User'),
            allowNull: false,
            },
        createdAt: {
            type: DataTypes.DATE,  
            allowNull: true
            },
        updatedAt: {
            type: DataTypes.DATE, 
            allowNull: true
            },
    },
        {
            sequelize,
            tableName: 'users',
            modelName: 'user'
            }
        )
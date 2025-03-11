import {Sequelize, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
})

export {User}

export default {
    User
}
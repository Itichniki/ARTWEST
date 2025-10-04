import sequelize from "../db.js";
import {DataTypes} from 'sequelize';


const User  = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {isEmail: true}},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
}, {
    tableName: 'user',
    timestamps: true,
});

const Project = sequelize.define('Project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    images: {type: DataTypes.JSONB, allowNull: false, defaultValue: []},
    description: {type: DataTypes.STRING, allowNull: false},
}, {
    tableName: 'project',
    timestamps: false,
});

const Type = sequelize.define('Type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false, },
    icon: {type: DataTypes.STRING, allowNull: false},
}, {
    tableName: "type",
    timestamps: false,
});

const Property = sequelize.define('Property', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    images: {type: DataTypes.JSONB, allowNull: false, defaultValue: []},
    status: {type: DataTypes.ENUM('sold', 'available'), allowNull: false, defaultValue: 'available'},
    description: {type: DataTypes.STRING, allowNull: false},
    num_bedrooms: { type: DataTypes.INTEGER, allowNull: false },
    num_bathrooms: { type: DataTypes.INTEGER, allowNull: false },
    size: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'property'
});

const Feature = sequelize.define('Feature', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    icon: {type: DataTypes.STRING, allowNull: false},
    // type: {type: DataTypes.ENUM('infrastracture', 'interior', 'exterior')}, nu hze
}, {
    tableName: "feature",
    timestamps: false,
});

//Projects Properties

Project.hasMany(Property, {
    foreignKey: 'project_id',
})
Property.belongsTo(Project, {
    foreignKey: 'project_id',
})

// PropertyFeature

Feature.belongsToMany(Property, {
    through: 'PropertyFeature',
    foreignKey: 'feature_id',
})

Property.belongsToMany(Feature, {
    through: 'PropertyFeature',
    foreignKey: 'property_id',
})

// property type

Type.hasMany(Property, {
    foreignKey: 'type_id',
})
Property.belongsTo(Type, {
    foreignKey: 'type_id',
    allowNull: false,
})

export {
    User,
    Property,
    Feature,
    Type,
    Project,
};
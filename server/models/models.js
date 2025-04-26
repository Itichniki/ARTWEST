import sequelize from "../db.js";
import {DataTypes} from 'sequelize';


const Location = sequelize.define('Location', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true },
    city: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    google_maps_link: { type: DataTypes.STRING, allowNull: true },
}, {
    tableName: "location",
    timestamps: false,
});

const User  = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {isEmail: true}},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
}, {
    tableName: 'user',
    timestamps: true,
});


const Company = sequelize.define('Company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING, allowNull: false},
}, {
    tableName: 'company',
    timestamps: false,
});

const Project = sequelize.define('Project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
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

// const PropertyInfo = sequelize.define('PropertyInfo', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
//
// }, {
//     tableName: "property_info",
//     timestamps: false,
// });

const Property = sequelize.define('Property', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address_line: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    images: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.ENUM('sold', 'available', 'reserved')},
    description: {type: DataTypes.STRING, allowNull: false},
    property_size: { type: DataTypes.INTEGER, allowNull: false },
    num_bedrooms: { type: DataTypes.INTEGER, allowNull: false },
    num_bathrooms: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: 'property',
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

//Company's Properties

Company.hasMany(Property, {
    foreignKey: 'company_id',
})

Property.belongsTo(Company, {
    foreignKey: 'company_id',
})

//Company's Projects

Company.hasMany(Project, {
    foreignKey: 'company_id',
})

Project.belongsTo(Company, {
    foreignKey: 'company_id',
})

//Projects Properties

Project.hasMany(Property, {
    foreignKey: 'project_id',
})
Property.belongsTo(Project, {
    foreignKey: 'project_id',
})

// locations

Location.hasMany(Property, {
    foreignKey: 'location_id',
})
Project.belongsTo(Location, {
    foreignKey: 'location_id',
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
})

// Property Info

// PropertyInfo.hasOne(Property, {
//     foreignKey: 'property_id',
// });
//
// Property.hasOne(PropertyInfo, {
//     foreignKey: 'property_id',
// });

export {
    User,
    Property,
    Feature,
    Type,
    Project,
    Company,
    Location,
};
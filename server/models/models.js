import sequelize from "../db.js";
import {DataTypes} from 'sequelize';


const Location = sequelize.define('Location', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true },
    city: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    google_url: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: "location",
    timestamps: false,
});

const User  = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {isEmail: true}},
    password: {type: DataTypes.STRING, allowNull: false},
    password_confirmation: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
}, {
    tableName: 'user',
    timestamps: true,
});


const Company = sequelize.define('Company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
}, {
    tableName: 'company',
    timestamps: false,
})

const Project = sequelize.define('Project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    company_id: {type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'company',
            key: 'id',
        }
    },
}, {
    tableName: 'project',
    timestamps: false,
});

const PropertyType = sequelize.define('PropertyType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: "property_type",
    timestamps: false,
});


const Property = sequelize.define('Property', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address_line: { type: DataTypes.STRING, allowNull: false },
    property_size: { type: DataTypes.INTEGER, allowNull: false },
    num_bedrooms: { type: DataTypes.INTEGER, allowNull: false },
    num_bathrooms: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },

    property_type_id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'property_type',
            key: 'id',
        }
    },

    location_id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'location',
            key: 'id',
        }
    },

    project_id: { type: DataTypes.INTEGER,
        references: {
            model: 'project',
            key: 'id',
        },
    },

    company_id: { type: DataTypes.INTEGER,
        references: {
            model: 'company',
            key: 'id',
        },
    },
}, {
    tableName: 'property',
});

const UserFavorite = sequelize.define('UserFavorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        },},
    property_id: {type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'property',
            key: 'id',
        },
    },
}, {
    tableName: "user_favorite",
    timestamps: false,
});


const Offer = sequelize.define('Offer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    offer_status_id: { type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'offer_status',
            key: "id",
        },
    },
},
    {
        tableName: "offer",
},);

const OfferStatus = sequelize.define('OfferStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'offer_status',
    timestamps: false,
});

// const UserOffer = sequelize.define('UserOffer', {
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'User',
//             key: 'id',
//         },
//     },
//     offer_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//         model: Offer,
//         key: 'id',
//     },
// },
// });

const PropertyFeature = sequelize.define('PropertyFeature', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
}, {
    tableName: "property_feature",
    timestamps: false,
});

const Feature = sequelize.define('Feature', {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    tableName: "feature",
    timestamps: false,
});

const Listing = sequelize.define('Listing', {
    id: {type: DataTypes.INTEGER,primaryKey:true, allowNull: false, autoIncrement: true, unique: true},
    name: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: "listing",
    timestamps: false,
});

const ListingStatus = sequelize.define('ListingStatus', {
    id: {type: DataTypes.INTEGER, primaryKey:true, allowNull: false, autoIncrement: true, unique: true},
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    tableName: "listing_status",
    timestamps: false,
});

const ListingType = sequelize.define('ListingType', {
    id: {type: DataTypes.INTEGER, primaryKey:true, allowNull: false, autoIncrement: true, unique: true},
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    tableName: "listing_type",
    timestamps: false,
});

// Users favorites

User.belongsToMany(Property, {
    through: 'UserFavorite',
})

Property.belongsToMany(User, {
    through: 'UserFavorite',
});

// User Offer

User.hasMany(Offer, {
    foreignKey: 'user_id',
})

Offer.belongsTo(User, {
    foreignKey: 'user_id',
})

//Offer Status

OfferStatus.hasMany(Offer, {
    foreignKey: 'offer_status_id'
})
Offer.belongsTo(OfferStatus, {
    foreignKey: 'offer_status_id',
})

//offer - property
Offer.belongsTo(Property, {
    foreignKey: 'property_id',
})

//Company

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

//project - property

Project.hasMany(Property, {
    foreignKey: 'project_id',
})
Property.belongsTo(Project, {
    foreignKey: 'project_id',
})

// locations

Location.hasMany(Project, {
    foreignKey: 'location_id',
})
Project.belongsTo(Location, {
    foreignKey: 'location_id',
})

// property feature

Feature.belongsToMany(Property, {
    through: 'PropertyFeature',
    foreignKey: 'feature_id',
})

Property.belongsToMany(Feature, {
    through: 'PropertyFeature',
    foreignKey: 'property_id',
})

// property type

PropertyType.hasMany(Property, {
    foreignKey: 'property_type_id',
})
Property.belongsTo(PropertyType, {
    foreignKey: 'property_type_id',
})

// Property listing

Property.hasMany(Listing, {
    foreignKey: 'property_id',
})

Listing.belongsTo(Property, {
    foreignKey: 'property_id',
})

// Listing status

ListingStatus.hasMany(Listing, {
    foreignKey: 'listing_status_id',
})
Listing.belongsTo(ListingStatus, {
    foreignKey: 'listing_status_id',
})

// Listing Type

ListingType.hasMany(Listing, {
    foreignKey: 'listing_type_id',
})
Listing.belongsTo(ListingType, {
    foreignKey: 'listing_type_id',
})














export {
    User,
    Offer,
    OfferStatus,
    Property,
    PropertyType,
    PropertyFeature,
    Feature,
    Location,
    ListingType,
    Listing,
    ListingStatus,
    UserFavorite,
    Project,
    // UserOffer,
    Company
};
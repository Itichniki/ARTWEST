const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User  = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false, validate: {isEmail: true}},
    password: {type: DataTypes.STRING, allowNull: false},
    password_confirmation: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 'USER'},
});

const UserFavorite = sequelize.define('user_favorite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false},
});

const UserOffer = sequelize.define('user_offer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    user_id: {type: DataTypes.INTEGER, primaryKey: false, autoIncrement: false, references: {User, key: 'id'}},
    offer_id: {type: DataTypes.INTEGER, primaryKey: false, references: {Offer, key: 'id'}},
});

const Offer = sequelize.define('offer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    property_id: { type: DataTypes.INTEGER, allowNull: false },
    offer_status_id: { type: DataTypes.INTEGER, allowNull: false }
});

const OfferStatus = sequelize.define('offer_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

const Property = sequelize.define('property', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address_line: { type: DataTypes.STRING, allowNull: false },
    property_size: { type: DataTypes.INTEGER, allowNull: false },
    num_bedrooms: { type: DataTypes.INTEGER, allowNull: false },
    num_bathrooms: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },

});

const PropertyType = sequelize.define('property_type', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

const PropertyFeature = sequelize.define('property_feature', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true },
});

const Feature = sequelize.define('feature', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});


const Location = sequelize.define('location', {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true },
    city: { type: DataTypes.STRING, allowNull: false },
    region: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    google_url: { type: DataTypes.STRING, allowNull: false }
});

const Listing = sequelize.define('listing', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true},
    name: { type: DataTypes.STRING, allowNull: false },
});

const ListingStatus = sequelize.define('listingStatus', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true},
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

const ListingType = sequelize.define('listingType', {
    id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, unique: true},
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
});




// User.hasOne(Favorite), ;
// Favorite.belongsTo(User)
//
// Favorite.hasMany(FavoriteProperty, foreignKey => {});
// FavoriteProperty.belongsTo(Property, )




//
// ListingType.hasMany(Listing, {foreignKey: 'listing_id'})
// Listing.belongsTo(ListingType, {foreignKey: 'listing'})
//
// User.belongsToMany(Property, {through: UserFavorite, foreignKey: 'userId'});
// Property.belongsToMany(User, {through: UserFavorite});
//
//
// User.belongsToMany(Property, { through: UserFavorite, foreignKey: 'user_id'});
// Property.belongsToMany(User, { through: UserFavorite, foreignKey: 'property_id' });
//
//




module.exports = {
    User,
    UserFavorite,
    UserOffer,
    Offer,
    OfferStatus
};
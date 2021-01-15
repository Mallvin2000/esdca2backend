//config.js
const dotenv = require('dotenv');
dotenv.config(); //Build the process.env object.
module.exports = {
    /* databaseUserName: process.env.DB_USERNAME,
    databasePassword: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE_NAME, */
    databaseUserName: 'admin',
    databasePassword: 'mallvin29',
    databaseName: 'esdca2',

    //cloudinaryUrl: process.env.CLOUDINARY_URL,
    cloudinaryUrl: 'https://res.cloudinary.com/mallvin2000/image/upload/v1605580715/Design/',
    //cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryCloudName: 'mallvin2000',
    //cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiKey: '743721356481276',
    //cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryApiSecret: 'SBnefGAi86bLxxC4nn-YOyTZQsw',
    //JWTKey: process.env.JWTKEY
    JWTKey: 'alllearnershavepotentialtobethebest'
};
//Reference:
//https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
/*
DB_USERNAME=root
DB_PASSWORD=mallvin29
DB_DATABASE_NAME=competition_system_security_concept_db
JWTKEY=alllearnershavepotentialtobethebest

CLOUDINARY_BASE_URL=https://res.cloudinary.com/mallvin2000/image/upload/v1605580715/Design/
CLOUDINARY_CLOUD_NAME=mallvin2000
CLOUDINARY_API_KEY=743721356481276
CLOUDINARY_API_SECRET=SBnefGAi86bLxxC4nn-YOyTZQsw*/
const dotenv = require('dotenv');
const path = require('path');


// Determine the correct .env file to load
const envFile = process.env.NODE_ENV === 'development' ? './environments/.env.development' : './environments/.env';

// Load the appropriate .env file
dotenv.config({ path: path.resolve(__dirname,'..', envFile) });

module.exports = {
    LOCAL_MONGODB: process.env.LOCAL_MONGODB,
    ORIGIN: process.env.ORIGIN,
    API_URL: process.env.API_URL,
    SECRET: process.env.SECRET,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT 
};

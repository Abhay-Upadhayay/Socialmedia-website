require('dotenv').config()

const _config = {
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    PUBLIC_KEY : process.env.PUBLIC_KEY,
    URL_ENDPOINT : process.env.URL_ENDPOINT,
    JWT_SECRET : process.env.JWT_SECRET,
    PORT : process.env.PORT,
    DB_CONNECTION_STRING : process.env.DB_CONNECTION_STRING,
    GEMINI_API_KEY : process.env.GEMINI_API_KEY
}

const config = Object.freeze(_config);

module.exports = config;
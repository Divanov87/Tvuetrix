    //require('dotenv').config();
require('@dotenvx/dotenvx').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const { SERVER_NAME, PORT, CORS_ORIGIN, CORS_ORIGIN_2, CORS_ORIGIN_3, CORS_ORIGIN_4, CORS_ORIGIN_SSL, CORS_ORIGIN_2_SSL, CORS_ORIGIN_3_SSL, CORS_ORIGIN_4_SSL, CORS_ORIGIN_5, CORS_ORIGIN_6, CORS_ORIGIN_7, CORS_ORIGIN_8} = require('./configs/envVariables');
const routes = require('./routes');
const { initDatabases } = require('./configs/initDatabases');
const { authHandler } = require('./middlewares/authMiddleware');
const userStatus = require('./middlewares/userStatus');
// const multer = require('multer');
const path = require('path');
const cors = require("cors");

const app = express();

const ORIGINS = [CORS_ORIGIN, CORS_ORIGIN_2, CORS_ORIGIN_3, CORS_ORIGIN_4, CORS_ORIGIN_SSL, CORS_ORIGIN_2_SSL, CORS_ORIGIN_3_SSL, CORS_ORIGIN_4_SSL, CORS_ORIGIN_5, CORS_ORIGIN_6, CORS_ORIGIN_7, CORS_ORIGIN_8];
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));
app.use(cors({
    origin: ORIGINS,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authHandler);
app.use(userStatus);
app.use(routes);

initDatabases()
    .then(() => {
        app.listen(PORT, () => console.log(`Server [${SERVER_NAME}] is listening @ http://127.0.0.1:${PORT}.. `));
    })
    .catch(err => console.error('Error Establishing a Database Connection!', err));
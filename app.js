//? Dependencies
import dotenv from 'dotenv';
import express from 'express';

import storageBodegas from './routes/bodegas.js'

dotenv.config();

const appExpress = express();
appExpress.use(express.json());

appExpress.use('/bodegas', storageBodegas);

const config = JSON.parse(process.env.MY_CONFIG);

appExpress.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})
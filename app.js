//? Dependencies
import dotenv from 'dotenv';
import express from 'express';

import storageBodegas from './routes/bodegas.js'
import storageProductos from './routes/productos.js'


dotenv.config();

const appExpress = express();
/* appExpress.use(express.json());
 */
appExpress.use("/bodegas", storageBodegas);
appExpress.use("/productos", storageProductos);


const config = JSON.parse(process.env.MY_CONFIG);

appExpress.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})
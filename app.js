//? Dependencies
import dotenv from 'dotenv';
import express from 'express';
//? Routes
import storageBodegas from './routes/bodegas.js';
import storageProductos from './routes/productos.js';
/* import storageInventarios from './routes/inventarios.js';
 */
//? Enviroment Variables
dotenv.config();

const app = express();
app.use(express.json());

//? Use Routes
app.use("/bodegas", storageBodegas);
app.use("/productos", storageProductos);
/* app.use("/inventarios", storageInventarios);
 */
//? Server
const config = JSON.parse(process.env.MY_CONFIG);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})
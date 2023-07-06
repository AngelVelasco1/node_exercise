//? Dependencies
import mysql from 'mysql';

import {Router } from 'express';

const storageProductos = Router();

let conx;

storageProductos.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    conx = mysql.createPool(myConfig);
    next();
})

//? List productos total descendent
storageProductos.get('/', (req, res) => {
    conx.query(
        'SELECT id FROM productos ORDER BY total DESC',
        (err, result, fil) => {
            res.json(JSON.stringify(result));
        }
    )
});



export default storageProductos;
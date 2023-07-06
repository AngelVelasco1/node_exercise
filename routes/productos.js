//? Dependencies
import mysql from 'mysql2';
import dotenv from 'dotenv';

import {Router} from 'express';
dotenv.config("../");

const storageProductos = Router();

let conx;

storageProductos.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    conx = mysql.createPool(myConfig);
    next();
})

//? List productos total descendent
storageProductos.get('/', (req, res, next) => {
    conx.query(
        'SELECT id FROM productos ORDER BY total DESC',
        (err, result, fil) => {
            res.json(result);
        }
    )
    next();
});

//? Insert products with default amount
storageProductos.post('/', (req, res) => {
    'INSERT into productos (id) VALUES ('
})


export default storageProductos;
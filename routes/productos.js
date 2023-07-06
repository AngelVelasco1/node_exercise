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
    const sqlGet = 'SELECT * FROM productos, SUM(inventarios.cantidad) AS total FROM productos, INNER JOIN inventarios ON productos.id  = inventarios.id_producto GROUP BY productos.id ORDER BY total DESC'
    conx.query(
        sqlGet,
        (err, result) => {
            if (err) {
                console.error("Error en la consulta: ", err);

            } else {
                res.json(JSON.stringify(result));
            }
        }
    )
    next();
});

//? Insert products with default amount
storageProductos.post('/', (req, res) => {
    'INSERT into productos (id) VALUES ('
})


export default storageProductos;
//? Dependencies
import mysql from 'mysql2';
import dotenv from 'dotenv';
import {Router} from 'express';
//? Enviroment variables
dotenv.config("../");

const storageInventarios = Router();

//? Variables
let conx;
const myConfig = JSON.parse(process.env.MY_CONNECT);

//? Use database
storageInventarios.use((req, res, next) => {
    try {
        conx = mysql.createPool(myConfig);
        next()
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.status(500);
    }   
});

//? Insert records
storageInventarios.post('/', (req, res) => {
    const { id_producto, id_bodega, cantidad } = req.body;

    try {
        const actionSelect = 'SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?';
        conx.query(actionSelect, [id_producto, id_bodega], (result) => {
            if (result > 0) {
                let currentCantidad = result[0].cantidad;
                const newCantidad = currentCantidad + cantidad;
                
                const actionUpdate = 'UPDATE inventarios SET cantidad = ?';
                conx.query(actionUpdate, [newCantidad, id_producto, id_bodega], (result) => {
                    res.json(JSON.stringify(result));
                })
            }
            else {
                const actionInsert = 'INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (4,5, 6)';
                conx.query(actionInsert, (result) => {
                    res.json(JSON.stringify(result));
                })
            }
        });
        

    } catch (err) {
        console.error('Error en la consulta: ', err);
        res.status(500);
    }

})

export default storageInventarios;
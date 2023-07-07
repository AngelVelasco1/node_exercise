//? Dependencies
import mysql from 'mysql2';
import dotenv from 'dotenv';
import {Router} from 'express';
//? Enviroment variables
dotenv.config("../");

const storageProductos = Router();

//? Variables
let conx;
const myConfig = JSON.parse(process.env.MY_CONNECT);

//? Use database
storageProductos.use((req, res, next) => {
    try {
        conx = mysql.createPool(myConfig);
        next();
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.status(500);
    }
})

//? List productos total descendent
storageProductos.get('/', (req, res) => {
    const action =  `
      SELECT p.*, IFNULL ((
          SELECT SUM(i.cantidad)
          FROM inventarios i
          WHERE i.id_producto = p.id
        ), 0)  AS total
        FROM productos p    
        ORDER by total DESC
    `
    conx.query(
        action, (err, result) => {
            if (err) {
                console.error("Error en la consulta: ", err);

            } else {
                res.json(JSON.stringify(result));
            }
        }
    )
});

export default storageProductos;
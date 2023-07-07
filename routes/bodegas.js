//? Dependencies
import mysql from "mysql2";
import dotenv from 'dotenv';
import { Router } from 'express';
//? Enviroment variables
dotenv.config("../");

const storageBodegas = Router();

//? Variables
let conx;
const myConfig = JSON.parse(process.env.MY_CONNECT);

//? Use database
storageBodegas.use((req, res, next) => {
    try {
        conx = mysql.createPool(myConfig);
        next();
    } catch (err) {
        console.error('Error de conexion:', err.message);
        res.status(500);
    }
});

//? List bodegas sorted alphabetically
storageBodegas.get('/', (req, res) => {
    const action = 'SELECT * FROM bodegas ORDER BY nombre ASC';
    conx.query(
        action, (err, result) => {
            if (err) {
                console.error('Error de conexion:', err.message);
                res.status(500);
            }
            res.send(JSON.stringify(result));
        });
}); 

//? Create bodegas
storageBodegas.post('/', (req, res) => {
    const action = 'INSERT INTO bodegas (nombre, id_responsable, estado, created_by, updated_by, created_at, updated_at, deleted_at) VALUES ("Default Nombre", 1, 1, 1, 1, NOW(), NOW(), NULL)';
    const { nombre, id_responsable, estado, created_by, updated_by, deleted_at } = req.body;
    const created_at = new Date().toISOString().replace('T', ' ');
    const updated_at = new Date().toISOString().replace('T', ' ');

    const newBodega = [
        nombre,
        id_responsable, 
        estado,
        created_by,
        updated_by,
        deleted_at,
        created_at,
        updated_at
    ];
    conx.query(
        action, (err) => {
            if (err) {
                console.error('Error de conexion:', err.message);
                res.status(500);
            } else {
                res.send(JSON.stringify(newBodega))
            }
        })
});

export default storageBodegas;
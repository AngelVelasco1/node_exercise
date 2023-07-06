//? Dependencies
import dotenv from 'dotenv';
import mysql from "mysql2";

import { Router } from 'express';
const storageBodegas = Router();
dotenv.config("../");

let conx = undefined;
const myConfig = process.env.MY_CONNECT;
storageBodegas.use((req, res, next) => {
    conx = mysql.createPool(myConfig);
    next();
})

//? List bodegas sorted alphabetically
storageBodegas.get('/', (req, res) => {
    conx.query(
        'SELECT * FROM bodegas ORDER BY nombre ASC',
        (err, result, fil) => {
            if (err) {
                console.error('Error :', err.message);
                res.sendStatus(500);
            } else {
                res.send(JSON.stringify(result));
            }
        }

    );
});

//? Create bodegas
storageBodegas.post('/', (req, res) => {
    const { nombre, id_responsable, estado, created_by, update_by, deleted_at } = req.body;
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const newBodega = [
        nombre,
        id_responsable,
        estado,
        created_by,
        update_by,
        created_at,
        updated_at,
        deleted_at
    ];
    const sqlPost = 'INSERT INTO bodegas (id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    conx.query(
        sqlPost, newBodega, (err) => {
            if (err) {
                console.error("Error en la consulta: ", err);

            } else {
                res.json(JSON.stringify(newBodega));
            }
        }
    );
});

export default storageBodegas;
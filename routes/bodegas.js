//? Dependencies
import dotenv from 'dotenv';
import mysql from "mysql2";
import {Router} from 'express';
dotenv.config("../");
const storageBodegas = Router();

let conx;
const myConfig = JSON.parse(process.env.MY_CONNECT);

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
    const newBodega = {
        nombre: req.body.nombre,
        id_responsable: req.body.id_responsable,
        estado: req.body.estado,
        created_by: req.body.created_by,
        update_by: req.body.update_by,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        deleted_at: req.body.deleted_at
    };

    conx.query(
        'INSERT INTO bodegas SET ?', newBodega, (err, fil, data) => {
            if (err) {
                console.error("Error en la consulta: ", err);
    
            } else {
                res.json(JSON.stringify(newBodega));
            }
        }
    );
});

export default storageBodegas;
//? Dependencies
import mysql from 'mysql';

import {Router} from 'express';

const storageBodegas = Router();
let conx;
storageBodegas.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    conx = mysql.createPool(myConfig);
    next();
})

//? List bodegas sorted alphabetically
storageBodegas.get('/', (req, res) => {
    conx.query(
        'SELECT * FROM bodegas ORDER BY nombre ASC',
        (err, result, fil) => {
            res.json(JSON.stringify(result));
        }
    )
});

//? Create bodegas
storageBodegas.post('/', (req, res) => {
    const { id, nombre, id_responsable, estado, created_by, update_by, created_at, updated_at, deleted_at } = req.body;
    const newBodega = {
        id,
        nombre,
        id_responsable,
        estado,
        created_by,
        update_by,
        created_at: new Date().toISOString(),
        updated_at,
        deleted_at
    }

    conx.query(
        'INSERT INTO bodegas SET ?', newBodega, (err, fil) => {
            res.json(JSON.stringify(newBodega));
        }
    )
})

export default storageBodegas;
//? Dependencies
import dotenv from 'dotenv';
import { Router } from 'express';
import proxyBodegas from '../middleware/proxyBodegas.js';
import { conx } from '../middleware/proxyBodegas.js';
//? Enviroment variables
dotenv.config("../");

const storageBodegas = Router();


//? List bodegas sorted alphabetically
storageBodegas.get('/', proxyBodegas, (req, res) => {
    const action = 'SELECT * FROM bodegas ORDER BY nombre ASC';
    conx.query(
        action, (err, result) => {
            if (err) {
                console.error('Error de conexion:', err.message);
                res.status(500);
            } else {
                res.send(JSON.stringify(result));
            }
        });
}); 

//? Create bodegas
storageBodegas.post('/', proxyBodegas, (req, res) => {
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
//? Dependencies
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Router } from 'express';
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
    const action = `
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

//? Insert products into inventories
storageProductos.post('/', (req, res) => {
    const productAction = 'INSERT INTO productos (nombre, descripcion, estado, created_by, update_by) VALUES ("Default name", "Default description", 1, NOW(), NOW())';
    const inventoryAction = 'INSERT INTO inventarios (id_bodega, id_producto, cantidad, created_by, update_by, created_at, updated_at) VALUES (1, 1, 1, NOW(), NOW(), NOW(), NOW())';
    const { nombre, descripcion, estado, created_by, update_by, initial_amount } = req.body;
    const bodegaDefaultId = 1;

    conx.query(
        productAction, [nombre, descripcion, estado, created_by, update_by], ((err, result) => {
            if (err) {
                console.error("Error al insertar producto: ", err);
                res.status(500);
            } else {
                const id_producto = result.insertId;
                conx.query(
                    inventoryAction, [bodegaDefaultId, id_producto, initial_amount, created_by, update_by], ((err, result) => {
                        (err) ? console.error("Error al insertar producto: ", err) : res.json({ mensaje: "Producto insertado exitosamente" });;
                    })
                )
            }
        })
    )

})

//? Transfer productos to other bodega 
storageProductos.post('/', (req, res) => {

  
    try {
        
    } catch (err) {
      console.error('Error en la consulta: ', err.message());
      res.status(500);
    }
  });
  
export default storageProductos;
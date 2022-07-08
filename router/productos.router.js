const express = require('express');
const Contenedor = require('../contenedor');
const { Router } = express;
const productosContenedor = new Contenedor('./public/data.txt')

const routerProducts = Router();

routerProducts.get('/', async (req, res) => {
    try {
        res.send(await productosContenedor.getAll());
    } catch (error) {
        console.error(error);
    }
});
routerProducts.get('/:id', async (req, res) => {
    try {
        res.send(await productosContenedor.getById(+req.params.id))
    } catch (error) {
        console.error(error);
    }
});

routerProducts.post('/', (req, res) => res.send('Producto creado'))
routerProducts.put('/', (req, res) => res.send('Producto actualizado'))
routerProducts.delete('/', (req, res) => res.send('Producto eleminado'))

module.exports = routerProducts;
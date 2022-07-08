const express = require('express');

const routerProducts = require('./router/productos.router')

const app = express();

app.use('/api/productos', routerProducts )

app.listen(8080);

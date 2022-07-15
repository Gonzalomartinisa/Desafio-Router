const express = require('express');
const routerProducts = require('./router/productos.router')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const Contenedor = require('./contenedor');

// app.use('/productos', routerProducts )
// app.use('/static', express.static('public'))

const pc = new Contenedor('./public/data.txt')

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.sendFile(__dirname + '/views/form.html'));

app.post('/productos', (req, res) => {
    pc.save(req.body)
        .then(() => res.redirect('/'))
        .catch(e => {
            console.log(e);
            res.send('No se guardo el archivo')
        })
})

app.get('/productos', (req, res) => {
    pc.getAll()
        .then(data => res.render('productos', { data }))
        .then(e => {
            console.log(e)
            res.send('Error al leer los archivos')
        })
})

app.listen(8080);
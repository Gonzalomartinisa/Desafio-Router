const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, 'uploads')},
    filename: (req, file, cb) => {cb(null, file.originalname + '-' + Date.now())}
});
const upload = multer({storage});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/uploadfile', upload.single('archivos'), (req, res, next) =>{
    const file = req.file
    if(!file){
        const error = new Error('Agregue un archivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file);
})

app.listen(8080);
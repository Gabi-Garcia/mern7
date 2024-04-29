const express = require('express');
require ("dotenv").config();
const { connectDB } = require('./src/config/db');
const { setError } = require('./src/config/error');
const indexRouter = require('./src/api/routes/indexRouter');
const cloudinary = require("cloudinary").v2;
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

connectDB()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});
// Configuracion del rate limiter
const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutos
    max: 50, // máximo de 50 peticiones por 3 minutos
    message: 'Has excedido el límite de peticiones, por favor intenta de nuevo más tarde.'
});

// Usa el rate limiter para todas las rutas
app.use(limiter);

// Middleware para habilitar CORS
app.use(cors()); 
app.use(express.json());

app.use('/api/v1', indexRouter);

app.use('*',(req, res, next)=>{
    return next(setError(404, "Not Found"))
})  

app.use((error, req, res, next)=>{
    return res.status(error.status || 500).json( error.message || 'Internal Server Error🤕')
})

app.listen(3000,()=>{
 console.log('Server en:http://localhost:3000')  
})
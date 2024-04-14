const express = require('express');
require ("dotenv").config();
const { connectDB } = require('./src/config/db');
const { setError } = require('./src/config/error');
const indexRouter = require('./src/api/routes/indexRouter');
const cloudinary = require("cloudinary").v2;

const app = express();

connectDB()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

app.use(express.json());

app.use('/api/v1', indexRouter);

// app.use('*',(req, res, next)=>{
//     return next(setError(404, "Not Found"))
// })  

app.use((error, req, res, next)=>{
    return res.status(error.status || 500).json( error.message || 'Internal Server Error🤕')
})

app.listen(3000,()=>{
 console.log('Server en:http://localhost:3000')
})
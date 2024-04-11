const mongoose = require('mongoose');

const connectDB = async(req, res, next)=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Conectado a la bbdd con éxito 😀')
    } catch (error) {
        console.log('Error concetando a la bbdd 🤐')
    }
}

module.exports = { connectDB }
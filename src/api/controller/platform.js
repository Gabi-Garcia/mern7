const { setError } = require('../../config/error')
const Platform = require('../model/platform');

//GET TODOS LAS PLATAFORMAS

const getAllPlatforms = async(req, res, next)=>{
    try {
        const allPlatforms = await Platform.find().populate("games")
        return res.status(200).json(allPlatforms)
    } catch (error) {
        return next(setError(400, "Can't find platforms 🤐"))
    }
}

//GET PLATFORM POR ID
const getPlatformById = async(req, res, next)=>{
    try {
        const { id } = req.params 
        const platform = await Platform.findById(id)
        return res.status(200).json(platform)
    } catch (error) {
        return next(setError(400, "Can't find platform 🤐"))
    }
}

//POST CREAR PLATFORM
const createPlatform = async(req, res, next)=>{
    try {
        const newPlatform = new Platform(req.body)
        console.log('1: ', newPlatform)
        const platformBBDD = await newPlatform.save()
        console.log('2: ', platformBBDD)
        return res.status(201).json(platformBBDD)
    } catch (error) {
        return next(setError(400, "Can't create platform 🤐"))
    }
}

//DELETE PLATFORM POR ID
const deletePlatform = async(req, res, next)=>{
    try {
        const { id } = req.params 
        const platform = await Platform.findByIdAndDelete(id)
        return res.status(200).json(platform)
    } catch (error) {
        return next(setError(500, "Can't delete platform 🤐"))
    }
}
//UPDATE (ACTUALIZAR) PLATFORM POR ID
const updatePlatform = async(req, res, next)=>{
    try {
        const { id } = req.params;
        const oldPlatform = await Platform.findById(id)
        const newPlatform = new Platform(req.body)
        newPlatform._id = id

       if(newPlatform.games){
        newPlatform.games = [... oldPlatform.games, ... newPlatform.games];
       }

       const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, {new: true})
        return res.status(200).json(platformUpdated)
    } catch (error) {
        return next(setError(500, "Can't update platform 🤐"))
    }
}

module.exports = {
    getAllPlatforms,
    getPlatformById,
    createPlatform,
    deletePlatform,
    updatePlatform
}
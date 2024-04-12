const { setError } = require('../../config/error')
const { generateSign } = require('../../config/jwt')
const User = require('../model/user')
const bcrypt = require('bcrypt')

const register = async(req, res, next)=>{
    try {
        const newUser = new User(req.body)
        //COMPRUEBO SI ESTÁ DUPLICADO EL USER
        const userDuplicate = await User.findOne({userName: req.body.userName})
        if(userDuplicate){
            return next(setError(400, "This user already exists🤐"))
        }
        const user = await newUser.save()
        return res.status(201).json(user)
    } catch (error) {
        return next(setError(400, "You are not register 🤐"))
    }
}

const login = async(req, res, next)=>{
    try {
        const user = await User.findOne({userName: req.body.userName});

        if(!user){
            return next(setError(400, "This user doesn't exists 🤐"))
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            const token = generateSign(user._id)//GENERAMOS EL TOKEN
            res.status(200).json({user, token})
        }else{
            return next(setError(400, "The passwords don't match 🤐"))
        }
    } catch (error) {
        return next(setError(400, "You are not login 🤐"))
    }
}
module.exports = { register, login}
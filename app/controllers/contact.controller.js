exports.create = (req, res) =>{
    res.send({mesage:"Create handler"})
}
exports.findAll = (req, res) =>{
    res.send({mesage:"findAll handler"})
}
exports.findOne = (req, res) =>{
    res.send({mesage:"findOne handler"})
}
exports.update = (req, res) =>{
    res.send({mesage:"update handler"})
}
exports.delete = (req, res) =>{
    res.send({mesage:"delete handler"})
}
exports.deleteAll = (req, res) =>{
    res.send({mesage:"deleteAll handler"})
}
exports.findAllFavorite = (req, res) =>{
    res.send({mesage:"findAllFavorite handler"})
}

const ApiError = require("../api-error")
const ContactService = require("../services/contact.service")
const MongoDB = require("../utils/mongodb.util")



exports.create = async (req, res, next ) => {
    if(!req.body?.name) {
        return next (new ApiError(400,"Name can not be empty"))
    }
    try {
        const ContactService = new ContactService(MongoDB.client)
        const document =    await ContactService.create(req.body)
        return res.send(document)
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while creating the contact")
        )
    }
}

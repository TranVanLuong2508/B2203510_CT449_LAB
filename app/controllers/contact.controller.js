const ApiError = require("../api-error")
const { app } = require("../config")
const ContactService = require("../services/contact.service")
const MongoDB = require("../utils/mongodb.util")


exports.create = async (req, res, next ) => {
    if(!req.body?.name) {
        return next (new ApiError(400,"Name can not be empty"))
    }
    try {
        const contactService = new ContactService(MongoDB.client)
        const document =    await contactService.create(req.body)
        return res.send(document)
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while creating the contact")
        )
    }
}

exports.findAll = async (req, res, next) =>{
    let document = []
    try {
        const contactService = new ContactService(MongoDB.client)
        if(req.query.name) {
            document =  await contactService.findByName(req.query.name)
        }
        else {
            document = await contactService.find({})
        }
    } catch (error) {
        return next(
            new ApiError(500,"An error occured while retrieving contacts")
        )
    }
    return res.send(document)
}

exports.findOne = async (req, res,next) =>{
    
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.findById(req.params.id)
        if(!document) {
            return next(new ApiError(400,"Contact not found"))
        }
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500,`Error retrieving contact with id = ${req.params.id}`))
    }
}

exports.update =  async (req, res, next) =>{
    if(Object.keys(req.body) === 0 ) {
        return next(new ApiError(400,"Data to update can not be empty !!!!!"))
    }
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.update(req.params.id,req.body) 

        if(!document) {
            return next(new ApiError(404,"contact not found"))
        }
        return res.send({mesage:"Contact was updated sucessfully !"})
    } catch (error) {
        return next(new ApiError(500,`Error updating contact with id = ${req.params.id}`))
    }    
}
exports.delete =  async (req, res, next) =>{
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.delete(req.params.id)
        if(!document) {
            return next(new ApiError(404,"Contact not found"))
        }  
        return res.send({mesage:"Contact was deleted successfully !"})    
    } catch (error) {
        return next(new ApiError(500,`Could not detete contact with id = ${req.params.id}`))
    }
}
exports.deleteAll =  async (req, res,next) =>{
    try {
        const contactService = new ContactService(MongoDB.client)
        const deletedCount = await contactService.deleteAll()
        return res.send({
            mesage:`${deletedCount} contacts were deleted sucessfully` 
        })
    } catch (error) {
        return next(new ApiError(500,"An error occured while removing all contacts"))
    }
}
exports.findAllFavorite = async (req, res, next) =>{
    try {
        const contactService = new ContactService(MongoDB.client)
        const document =  await contactService.findFavorite()
        if(!document){
            return next(new ApiError(404,"Contact not found"))
        }
        return res.send(document)
    } catch (error) {
        return next(new ApiError(500,`An error occured while retrieving favorite contacts`))
    }
}


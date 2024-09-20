const {ObjectId} = require("mongodb")

class ContactService {

   constructor (client) {

    this.contact= client.db().collection("contacts")
   }

   extractContactData(payload) {
    const contact ={
        name:payload.name,
        email:payload.email,
        address:payload.address,
        phone: payload.phone,
        favorite: payload.favorite,
    }
    Object.keys(contact).forEach(key => {
        contact[key] === undefined && delete contact[key]
    })
    return contact
   }

   async create (payload) {
    const contact = this.extractContactData(payload)
    const result =  await this.contact.findOneAndUpdate(contact, 
        {$set:{favorite: contact.favorite === true }},
        {returnDocument:"after", upsert: true}
    )
    return result
   }    

   async find(filter) {
    const cursor  =  await this.contact.find(filter)
    return await cursor.toArray()
   }

   findByName(name) {
    return  this.find({
        name: { $regex: new RegExp (new RegExp(name)), $options:"i"}
    })
   }
}

module.exports = ContactService

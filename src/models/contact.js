const mongoose = require('mongoose')
const validator = require('validator')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        match:'\d',
        minlength:10,
        maxlength:10
    }
})

contactSchema.methods.toJSON = function () {
    const contact = this
    const contactObject = contact.toObject()
    delete contactObject._id
    delete contactObject.__v
    return contactObject
}

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
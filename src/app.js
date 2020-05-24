const express = require('express')
require('./db/mongoose')
const cors = require('cors')
//const contactRouter = require('./routers/contactRouter')

const Contact= require('./models/contact')

const app = express()

app.use(express.json())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
//     next();
// });

app.use(cors())
  
app.get('/contacts', async (req, res) => {
    Contact.find({},(err,contacts) => {
        if (contacts) {
            setTimeout(() => {
                res.send(contacts)  
            },2000)
        }
    })
})

app.post('/contacts/add', async (req, res) => {
    const contact = new Contact(req.body)
    try {
        await contact.save()
        setTimeout(() => {
            res.status(200).send({ message:'Success' })
        },2000);
    } catch (e) {
        console.log(e)
        res.status(200).send({ message:'Error' })
    }
})

app.post('/contacts/delete', async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({ name: req.body.name })
        if (!contact) {
            return res.status(404).send()
        }
        setTimeout(() => {
            res.status(200).send({ message:'Success' })
        },2000);
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

app.post('/contacts/edit', async (req, res) => {
    try {
        const contact = await Contact.findOne({ name: req.body.existingName })
        if (!contact) {
            return res.status(404).send()
        } 
        contact.overwrite({
            name: req.body.newName,
            mobileNumber: req.body.mobileNumber
        })
        await contact.save()
        setTimeout(() => {
            res.status(200).send({ message:'Success' })
        },2000);
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports=app
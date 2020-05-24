const express = require('express')
const Contact = require('../models/contact')

const router = express.Router()

router.get('/contacts', async (req, res) => {
    Contact.find({},(err,contacts) => {
        if (contacts) {
            res.send(contacts)
        }
    })
})
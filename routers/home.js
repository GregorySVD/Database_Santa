const express = require('express')

const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) => {
        res.redirect('/child');
    })
module.exports = {
    homeRouter,
}

const express = require('express')

const childRouter = express.Router();

childRouter
    .get('/', (req, res) => {
        res.render('children/list.hbs');
    });


module.exports = {
    childRouter,
}

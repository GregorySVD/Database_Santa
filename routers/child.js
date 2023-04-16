const express = require('express')
const {ChildRecord} = require("../records/child.record");

const childRouter = express.Router();

childRouter
    .get('/', (req, res) => {
        const childrenList = ChildRecord.listAll();
        res.render('children/list.hbs', { // send childrenList form child.record to list.hbs views
            childrenList,
        });
    });


module.exports = {
    childRouter,
}
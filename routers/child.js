const express = require('express')
const {ChildRecord} = require("../records/child.record");
const {GiftRecord} = require("../records/gift.record");

const childRouter = express.Router();

childRouter
    .get('/', (req, res) => {
        const childrenList = ChildRecord.listAll();
        const giftsList = GiftRecord.listAll();
        res.render('children/list.hbs', { // send childrenList form child.record to list.hbs views
            childrenList,
            giftsList,
        });
    });


module.exports = {
    childRouter,
}

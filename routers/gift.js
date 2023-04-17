const express = require('express')
const {GiftRecord} = require("../records/gift.record");

const giftRouter = express.Router();

giftRouter
    .get('/', async (req, res) => {
        const giftsList = await GiftRecord.listAll();
        res.render('gifts/list.hbs', { // send childrenList form child.record to list.hbs views
            giftsList,
        });
    });


module.exports = {
    giftRouter,
}

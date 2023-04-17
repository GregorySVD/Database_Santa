const express = require('express')
const {GiftRecord} = require("../records/gift.record");

const giftRouter = express.Router();

giftRouter
    .get('/', async (req, res) => {
        const giftsList = await GiftRecord.listAll();
        res.render('gifts/list.hbs', { // send childrenList form child.record to list.hbs views
            giftsList,
        });
    })

    .post('/', async (req, res) => {
        // console.log(req.body); //count isn't number so:
        const data = {
            ...req.body,
            count: Number(req.body.count),
        }; //making sure data count is a number
        const newGift = new GiftRecord(data); //create new gift using GiftRecord
        await newGift.insert();

        res.redirect('/gift');
    });


module.exports = {
    giftRouter,
}

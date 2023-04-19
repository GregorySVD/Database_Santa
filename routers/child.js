const express = require('express')
const {ChildRecord} = require("../records/child.record");
const {GiftRecord} = require("../records/gift.record");
const {ValidationError} = require("../utils/errors");

const childRouter = express.Router();

childRouter
    .get('/', async (req, res) => {
        const childrenList = await ChildRecord.listAll();
        const giftsList = await GiftRecord.listAll();
        res.render('children/list.hbs', { // send childrenList form child.record to list.hbs views
            childrenList,
            giftsList,
        });
    })
    .post('/', async (req, res) => {
        const newChild = new ChildRecord(req.body); //create new gift using GiftRecord
        await newChild.insert();

        res.redirect('/child');
    })
    .patch('/gift/:childId', async (req, res) => {
        const child = await ChildRecord.getOne(req.params.childId);
        if (child === null) {
            throw new ValidationError('Child cannot be find, try other child');
        }
        const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId)//empty string means no
        // gift
        if (gift) {
            console.log(gift.count)
        }
        child.giftId = gift === null ? null : gift.id;
        await child.update();

        res.redirect('/child');
    });


module.exports = {
    childRouter,
}

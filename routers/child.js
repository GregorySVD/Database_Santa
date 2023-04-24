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
        res.redirect('/child?added=true');
    })
    .patch('/gift/:childId', async (req, res) => {
        const child = await ChildRecord.getOne(req.params.childId);
        if (child === null) {
            throw new ValidationError('Child cannot be find, try other child');
        }

        const gift = req.body.giftId === '' ? null : await GiftRecord.getOne(req.body.giftId)//empty string means no
        if (gift) {
            if (gift.count <= await gift.countGivenGifts()) {
                throw new ValidationError('This kind of gift has already been taken by another child');
            }
        }
        child.giftId = gift?.id ?? null;
        await child.update();

        res.redirect('/child');
    })
    .get('/delete/:id', async (req, res) => {
        const testId = '855b731d-d5bb-4045-a613-44e35dbb3e04'
        const child = await ChildRecord.getOne(testId);
        if (child === null) {
            throw new ValidationError('Child cannot be find, try other child');
        }
        console.log(await child.name)

        //await child.delete();
        res.render('test.hbs', {child: child});
    })


module.exports = {
    childRouter,
}

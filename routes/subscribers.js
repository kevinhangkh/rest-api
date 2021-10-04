const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//GET all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    
})

//GET one
router.get('/:id', (req, res) => {
    try {
        Subscriber.findById(req.params.id, (err, sub) => {
            if (err) {
                res.status(500).json({ message: err.message });
                return;
            }
            console.log("sub: " + sub);
            if (sub == null) 
            return res.status(404).json({ message: `Cannot find subscriber with id ${req.params.id}`});
            
            res.subscriber = sub;
            res.json(res.subscriber);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
})

//POST one
router.post('/', async (req, res) => {
    
    const sub = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    })
    
    try {
        const newSub = await sub.save();
        res.status(201).json(newSub);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
})

//UPDATE (PATCH instead of PUT cause we want to update only one field) one
router.patch('/:id', (req, res) => {

    try {
        Subscriber.findById(req.params.id, (err, sub) => {
            if (err)
                return res.status(500).json({ message: err.message });

            if (sub == null) 
                return res.status(404).json({ message: `Cannot find subscriber with id ${req.params.id}`});

            res.subscriber = sub;
            if (req.body.name != null) {
                res.subscriber.name = req.body.name;
            }
            if (req.body.subscribedToChannel != null) {
                res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
            }

            res.subscriber.save();
            res.json(res.subscriber);
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

//DELETE one
router.delete('/:id', (req, res) => {
    try {
        Subscriber.findByIdAndRemove(req.params.id, (err, sub) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            console.log("sub: " + sub);
            if (sub == null)
                return res.status(404).json({ message: `Cannot find subscriber with id ${req.params.id}`});
            
            res.subscriber = sub;
            res.json(res.subscriber);
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        console.log("looking for " + req.params.id);
        const id = new mongoose.Types.ObjectId(req.params.id);
        console.log("id " + id);
        subscriber = await Subscriber.findById(id, (err, sub) => {
            if (err) {
                error(err);
                return;
            }
            console.log("sub: " + sub);
            res.subscriber = sub;
        });
        
        // console.log("found " + res.subscriber);
        if (subscriber == null) 
        return res.status(404).json({ message: `Cannot find subscriber with id ${req.params.id}`});
    } catch (error) {
        return res.status(500).json({ message: error.message });        
    }
    
    // console.log("subscriber ");
    // console.log(res.subscriber);
    // res.subscriber = subscriber;
    next();
}


module.exports = router;
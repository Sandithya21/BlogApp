const express = require("express");
const router = express.Router();
const mongoType = require('mongoose').Types;
const Post = require('../models/Post');

//get all
router.get('/', (req, res) => {
    Post.find((err, doc) => {
        if (err) {
            console.log("error occur", +err);
            res.status(400).send('internal error', err)
        } else {
            res.send(doc);
        }
    })
})

//create new post
router.post('/', (req, res) => {
    let post = new Post ({
        title : req.body.title,
        content : req.body.content,
        username : req.body.username,
    })
    post.save((err, doc) => {
        if (err) {
            console.log("error occur", +err);
            res.status(400).send('internal error', err)    
        } else {
           res.send(doc) 
        }
    })
})

//get data by id
router.get('/', (req, res) => {
    if (mongoType.ObjectId.isValid(req.params.id)) {
        Post.findById(req.params.id, (err, doc) => {
            if (err) {  
                console.log("error occur", +err);
                res.status(400).send('internal error', err)
            } else {
                res.send(doc);
            }
        })
    } else {
        res.status(400).send('No record found by this id : ', id)
    }
})
const express = require("express");
const router = express.Router();
const mongoType = require('mongoose').Types;
const Post = require('../models/Post');

//get all
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send('Internal Server Error');
    }
});

//create new post
router.post('/', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            username: req.body.username,
        });

        const savedPost = await post.save();
        res.send(savedPost);
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(400).send('Internal error', err);
    }
});




//get data by id
router.get('/:id', async (req, res) => {
    try {
        if (mongoType.ObjectId.isValid(req.params.id)) {
            const doc = await Post.findById(req.params.id);
            if (doc) {
                res.send(doc);
            } else {
                res.status(404).send('No record found by this id');
            }
        } else {
            res.status(400).send('Invalid ID');
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send('Internal Server Error');
    }
})

//delete data by id
router.delete('/:id', async (req, res) => {
    try {
        if (mongoType.ObjectId.isValid(req.params.id)) {
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
            if (deletedPost) {
                res.send(deletedPost);
            } else {
                res.status(404).send('No record found by this id');
            }
        } else {
            res.status(400).send('Invalid ID');
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send('Internal Server Error');
    }
});

//update data by id
router.put('/:id', async (req, res) => {
    try {
        if (mongoType.ObjectId.isValid(req.params.id)) {
            const post = {
                title: req.body.title,
                content: req.body.content,
                username: req.body.username,
            };

            const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, { new: true });
            if (updatedPost) {
                res.send(updatedPost);
            } else {
                res.status(404).send('No record found by this id');
            }
        } else {
            res.status(400).send('Invalid ID');
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
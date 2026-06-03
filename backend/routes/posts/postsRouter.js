const express = require('express');
const multer = require("multer");
const storage = require("../../utils/fileUpload")
const { createPost, getAllPosts,getPublicPosts, getSinglePost, deletePost, updatePost, likePost, dislikePost, clapPost, schedulePost, postViewCount } = require('../../controllers/posts/postsController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAccountVerified = require('../../middlewares/isAccountVerified');

const postsRouter = express.Router();

const upload = multer({storage});

postsRouter.post('/',isLoggedIn, isAccountVerified, upload.single("file") , createPost);
postsRouter.get('/', isLoggedIn, getAllPosts);
postsRouter.get('/public', getPublicPosts);
postsRouter.get('/:id', getSinglePost);
postsRouter.put('/update/:id',isLoggedIn, updatePost);
postsRouter.delete('/:id',isLoggedIn, deletePost);
postsRouter.put('/like/:postId',isLoggedIn, likePost);
postsRouter.put('/dislike/:postId',isLoggedIn, dislikePost);
postsRouter.put('/clap/:postId',isLoggedIn, clapPost);
postsRouter.put('/schedule/:postId',isLoggedIn, schedulePost);
postsRouter.put("/:id/post-view-count", isLoggedIn, postViewCount);


module.exports = postsRouter;
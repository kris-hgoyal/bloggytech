const express = require('express');
const { createComment, deleteComment, updateComment } = require('../../controllers/comments/commentsComtroller');
const isLoggedIn = require('../../middlewares/isLoggedIn');

const commentsRouter = express.Router();

commentsRouter.post('/:postId',isLoggedIn, createComment);
commentsRouter.put('/:commentId',isLoggedIn, updateComment);
commentsRouter.delete('/:commentId',isLoggedIn, deleteComment);

module.exports = commentsRouter;
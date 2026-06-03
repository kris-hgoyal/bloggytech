const asyncHandler = require('express-async-handler');
const Comment = require('../../models/Comments/Comment');
const Post = require('../../models/Posts/Post');




// create new comment
// route POST /api/v1/comments/:postId
// access private (logged in users)
exports.createComment = asyncHandler(async (req, res, next) => {
    const { message } = req.body;

    const postId = req?.params?.postId;

    //create new comment
    const comment = await Comment.create({
        message,
        author: req?.userAuth?.id,
        postId
    });

    //update the post by adding comment in it
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, { new: true });

    //send the response
    res.status(201).json({
        status: "success",
        message: "Comment created successfully",
        comment
    });
});

//delete comment
// route DELETE /api/v1/comments/:id
// access private (logged in users)
exports.deleteComment = asyncHandler(async (req, res, next) => {
    const commentId = req?.params?.commentId;
    
    // Delete the comment
    await Comment.findByIdAndDelete(commentId);

    // Send the response
    res.status(200).json({
        status: "success",
        message: "Comment deleted successfully"
    });
});


// update comment
// route PUT /api/v1/comments/:id
// access private (logged in users)
exports.updateComment = asyncHandler(async (req, res, next) => {
    const commentId = req?.params?.commentId;
    const message = req.body.message;
    console.log(req.params);
    // Find the comment
    const comment = await Comment.findById(commentId);

    // Update the comment
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { message }, { new: true , runValidators: true});

    // Send the response
    res.status(200).json({
        status: "success",
        message: "Comment updated successfully",
        comment: updatedComment
    });
});

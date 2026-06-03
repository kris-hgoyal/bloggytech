const asyncHandler = require("express-async-handler");
const Post = require("../../models/Posts/Post");
const User = require("../../models/Users/User");
const Category = require("../../models/Categories/Category");

// create new post
// route POST /api/v1/posts
// access private (logged in users)
exports.createPost = asyncHandler(async (req, res, next) => {
  //Get the Payload from the request body
  const { title, content, categoryId } = req.body;
  const userId = req?.userAuth?.id;
  // Check if post exists
  const postFound = await Post.findOne({ title });
  if (postFound) {
    let error = new Error("Post already exists");
    error.status = 400;
    next(error);
  }

  // Create new post
  const post = await Post.create({
    title,
    content,
    author: userId,
    category: categoryId,
    image: req?.file?.url,
  });

  //Update the category by adding post in it
  await Category.findByIdAndUpdate(
    categoryId,
    { $push: { posts: post._id } },
    { new: true },
  );

  //Update user by adding post in it
  await User.findByIdAndUpdate(
    userId,
    { $push: { posts: post._id } },
    { new: true },
  );

  //send the response
  res.status(201).json({
    status: "success",
    message: "Post created successfully",
    post,
  });
});

// get all the posts
// route GET /api/v1/posts
// access private
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  // get the currently loggen in user id
  const currentUserId = req?.userAuth?.id;
  //get the current time
  const currentDateTime = new Date();
  //get all the users who have blocked the currently logged in user
  const userBlockingCurrentUser = await User.find({
    blockedUsers: currentUserId,
  });
  //extract the ids of the users who have blocked the currently logged in user
  const blockingUserIds = userBlockingCurrentUser.map((user) => user._id);
  const query = {
    author: { $nin: blockingUserIds },
    $or: [
      { scheduledPublished: null },
      { scheduledPublished: { $lte: currentDateTime } },
    ],
  };
  //get all posts except those from blocked users
  const allPosts = await Post.find(query)
    .populate({
      path: "author",
      model: "User",
      select: "email username",
    })
    .populate({
      path: "category",
      model: "Category",
      select: "name",
    });
  res.status(200).json({
    status: "success",
    message: "Posts retrieved successfully",
    posts: allPosts,
  });
});

// get single posts
// route GET /api/v1/posts/:id
// access public
exports.getSinglePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId)
    .populate("author", "-password -email")
    .populate("category")
    .populate("comments")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });
  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    next(error);
  }
  res.status(200).json({
    status: "success",
    message: "Post retrieved successfully",
    post,
  });
});

// get only 4 posts
// route GET /api/v1/posts/public
// access public
exports.getPublicPosts = asyncHandler(async (req, res, next) => {
  const post = await Post.find({})
    .sort({ createdAt: 1 })
    .limit(4)
    .populate("category");
  res.status(201).json({
    status: "success",
    message: "Four Post retrieved successfully",
    post,
  });
});

// delete single post
// route DELETE /api/v1/posts/:id
// access private (author and admin only)
exports.deletePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);

  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    next(error);
  }
  const isAuthor =
    req?.userAuth?._id.toString() === post?.author?._id.toString();
  if (!isAuthor) {
    let error = new Error("You Cannot Delete This Post");
    error.status = 404;
    next(error);
  }

  await Post.findByIdAndDelete(postId);
  res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
});

// update single post
// route PUT /api/v1/posts/update/:id
// access private (author and admin only)
exports.updatePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const post = req.body;
  const fetchedPost = await Post.findById(postId);
  if (!fetchedPost) {
    let error = new Error("Post not found");
    error.status = 404;
    next(error);
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, post, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    message: "Post updated successfully",
    updatedPost,
  });
});

//like a post
//PUT /api/v1/posts/like/:postId
//access private (logged in users)
exports.likePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userAuth.id;

  const post = await Post.findById(postId);

  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }

  // Remove from dislikes if already disliked
  if (post.dislikes.includes(userId)) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { dislikes: userId },
    });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { likes: userId },
    },
    { new: true },
  )
    .populate("author", "-password -email")
    .populate("category")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });

  res.status(200).json({
    status: "success",
    message: "Post liked successfully",
    post: updatedPost,
  });
});

//dislike a post
//PUT /api/v1/posts/dislike/:postId
//access private (logged in users)
exports.dislikePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.userAuth.id;

  const post = await Post.findById(postId);

  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }

  // Remove from likes if already liked
  if (post.likes.includes(userId)) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: userId },
    });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $addToSet: { dislikes: userId },
    },
    { new: true },
  )
    .populate("author", "-password -email")
    .populate("category")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });

  res.status(200).json({
    status: "success",
    message: "Post disliked successfully",
    post: updatedPost,
  });
});

//clapping a post (add clapps to a claps array in post model and update the claps count)
//PUT /api/v1/posts/clap/:postId
//access private (logged in users)
exports.clapPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    return next(error);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { claps: 1 },
    },
    { new: true },
  )
    .populate("author", "-password -email")
    .populate("category")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });

  res.status(200).json({
    status: "success",
    message: "Post clapped successfully",
    post: updatedPost,
  });
});

//@desc   post  view count
//@route  PUT /api/v1/posts/:id/post-view-count
//@access Private
exports.postViewCount = asyncHandler(async (req, res) => {
  //Get the id of the post
  const { id } = req.params; //get the login user
  const userId = req.userAuth._id; //Find the post
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  } //Push thr user into post likes
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      $addToSet: { postViews: userId },
    },
    { new: true },
  )
    .populate("author", "-password -email")
    .populate("category")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        select: "username",
      },
    });

  res.status(200).json({
    message: "Post viewed successfully",
    post: updatedPost,
  });
});

//scheduling a post
//Put /api/v1/posts/schedule/:postId
//access private (author and admin only)
exports.schedulePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const { schedulePublished } = req?.body;
  // check if post id or schedulePublished is provided
  if (!postId || !schedulePublished) {
    let error = new Error("Post id and schedulePublished date are required");
    error.status = 400;
    next(error);
  }
  // find the post by id
  const post = await Post.findById(postId);
  if (!post) {
    let error = new Error("Post not found");
    error.status = 404;
    next(error);
  }
  //check if the user is the author of the post
  const userId = req?.userAuth?.id;
  if (post.author.toString() !== userId) {
    let error = new Error("You can only schedule your own posts");
    error.status = 403;
    next(error);
  }
  //check if the scheduledPublished date is in the future
  const scheduledDate = new Date(schedulePublished);
  const currentDate = new Date();
  if (scheduledDate <= currentDate) {
    let error = new Error("Scheduled published date must be in the future");
    error.status = 400;
    next(error);
  }
  //update the scheduledPublished field of the post
  post.scheduledPublished = scheduledDate;
  await post.save();
  res.status(200).json({
    status: "success",
    message: "Post scheduled successfully",
    post,
  });
});

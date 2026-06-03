const User = require("../../models/Users/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../../utils/generateToken");
const asyncHandler = require("express-async-handler");
const sendEmail = require("../../utils/sendEmail");
const sendAccountVerificationEmail = require("../../utils/sendVerificationEmail");

// register user
// route POST /api/v1/users/register
// access public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, password, email } = req.body;
  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("User already exists");
  }
  // Create new user
  const newUser = new User({ username, password, email });
  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();
  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    _id: newUser?._id,
    username: newUser?.username,
    email: newUser?.email,
    role: newUser?.role,
  });
});

// login user
// route POST /api/v1/users/login
// access public
exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  // Check if user exists
  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    throw new Error("Invalid username");
  }
  // Check if password is correct
  const isMatch = await bcrypt.compare(password, existingUser?.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  existingUser.lastLogin = Date.now();
  await existingUser.save();
  // Return user data (excluding password)
  res.status(200).json({
    status: "success",
    message: "User logged in successfully",
    _id: existingUser?._id,
    username: existingUser?.username,
    email: existingUser?.email,
    role: existingUser?.role,
    followers: existingUser?.followers,
    following: existingUser?.following,
    posts: existingUser?.posts,
    blockedUsers: existingUser?.blockedUsers,
    profileViewers: existingUser?.profileViewers,
    isVerified: existingUser?.isVerified,
    accountLevel: existingUser?.accountLevel,
    profilePicture: existingUser?.profilePicture,
    coverImage: existingUser?.coverImage,
    likedPosts: existingUser?.likedPosts,
    createdAt: existingUser?.createdAt,
    token: generateToken(existingUser),
    bio: existingUser?.bio,
    location: existingUser?.location,
    gender: existingUser?.gender,
  });
});

// profile viewing
// route GET /api/v1/users/profile
// access PRIVATE (only authenticated users can view their profile)
exports.getprofile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userAuth._id)
    .populate({ path: "posts", model: "Post" })
    .populate({ path: "following", model: "User" })
    .populate({ path: "followers", model: "User" })
    .populate({ path: "blockedUsers", model: "User" })
    .populate({ path: "profileViewers", model: "User" });

  res.status(200).json({
    status: "success",
    message: "User profile retrieved successfully",
    user: user,
  });
});

//@desc   Block user
//@route  PUT /api/v1/users/block/:userIdToBlock
//@access Private

exports.blockUser = asyncHandler(async (req, res, next) => {
  //! Find the user to be blocked
  const userIdToBlock = req.params.userIdToBlock;
  const userToBlock = await User.findById(userIdToBlock);
  if (!userToBlock) {
    let error = new Error("User to block not found");
    next(error);
    return;
  } // ! user who is blocking
  const userBlocking = req.userAuth._id; // check if user is blocking him/herself
  if (userIdToBlock.toString() === userBlocking.toString()) {
    let error = new Error("Cannot block yourself");
    next(error);
    return;
  } //find the current user
  const currentUser = await User.findById(userBlocking); //? Check if user already blocked
  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    let error = new Error("This user has already been blocked");
    next(error);
    return;
  } //push the user to be blocked in the array of the current user
  currentUser.blockedUsers.push(userIdToBlock);
  await currentUser.save();
  res.json({
    message: "User blocked successfully",
    status: "success",
  });
});

//@desc   unBlock user
//@route  PUT /api/v1/users/unblock/:userIdToUnBlock
//@access Private
exports.unblockUser = asyncHandler(async (req, res, next) => {
  //* Find the user to be unblocked
  const userIdToUnBlock = req.params.userIdToUnblock;
  const userToUnBlock = await User.findById(userIdToUnBlock);
  if (!userToUnBlock) {
    let error = new Error("Cannot find user to be unblocked");
    next(error);
    return;
  } //find the current user
  const userUnBlocking = req.userAuth._id;
  const currentUser = await User.findById(userUnBlocking); //check if user is blocked before unblocking

  if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
    let error = new Error("User not blocked");
    next(error);
    return;
  } //remove the user from the current user blocked users array
  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    (id) => id.toString() !== userIdToUnBlock,
  ); //resave the current user
  await currentUser.save();
  res.json({
    status: "success",
    message: "User unblocked successfully",
  });
});

//view another user profile
// route GET /api/v1/users/view-other-profile/:userProfileId
// access PRIVATE (only authenticated users can view other user profiles)
exports.viewOtherProfile = asyncHandler(async (req, res, next) => {
  const userProfileId = req?.params?.userProfileId;
  const userProfile = await User.findById(userProfileId);
  if (!userProfile) {
    let error = new Error("User not found");
    error.status = 404;
    next(error);
    return;
  }
  const currentUserId = req?.userAuth?._id;
  // check if the user is blocked by the profile user
  if (userProfile?.blockedUsers?.includes(currentUserId)) {
    let error = new Error("You are blocked by this user");
    error.status = 403;
    next(error);
    return;
  }

  //check if we have already viewed the profile of userProfileId
  if (!userProfile?.profileViewers?.includes(currentUserId)) {
    console.log(currentUserId);
    userProfile.profileViewers.push(currentUserId);
    await userProfile.save();
  }

  res.status(200).json({
    status: "success",
    message: "User profile retrieved successfully",
    user: userProfile.username,
  });
});

//@desc  Get profile
//@route GET /api/v1/users/public-profile/:userId
//@access Public

exports.getPublicProfile = asyncHandler(async (req, res, next) => {
  //! get user id from params
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "category",
      },
    });

  res.json({
    status: "success",
    message: "Public Profile fetched",
    user,
  });
});

//following user
// route PUT /api/v1/users/follow/:userIdToFollow
// access PRIVATE (only authenticated users can follow other users)
exports.followUser = asyncHandler(async (req, res, next) => {
  //find the current user
  const currentUserId = req?.userAuth?._id;
  const currentUser = await User.findById(currentUserId);

  //find the user to follow
  const userIdToFollow = req?.params?.userIdToFollow;
  console.log(userIdToFollow);
  const userProfile = await User.findById(userIdToFollow);
  if (!userProfile) {
    let error = new Error("User not found");
    error.status = 404;
    next(error);
    return;
  }

  //cannot follow yourself
  if (currentUserId.toString() === userIdToFollow.toString()) {
    let error = new Error("You cannot follow yourself");
    error.status = 400;
    next(error);
    return;
  }

  //push the id of usertofollow in the following array of current user
  await User.findByIdAndUpdate(
    currentUserId,
    { $addToSet: { following: userIdToFollow } },
    { new: true },
  );

  //push the id of current user in the followers array of user to follow
  await User.findByIdAndUpdate(
    userIdToFollow,
    { $addToSet: { followers: currentUserId } },
    { new: true },
  );

  //save both the documents
  await currentUser.save();
  await userProfile.save();

  //return response
  res.status(200).json({
    status: "success",
    message: `You are now following ${userProfile?.username}`,
  });
});

//unfollowing user
// route PUT /api/v1/users/unfollow/:userIdToUnfollow
// access PRIVATE (only authenticated users can unfollow other users)
exports.unfollowUser = asyncHandler(async (req, res, next) => {
  //find the current user
  const currentUserId = req?.userAuth?._id;
  const currentUser = await User.findById(currentUserId);
  //find the user to unfollow
  const userIdToUnfollow = req?.params?.userIdToUnfollow;
  const userProfile = await User.findById(userIdToUnfollow);
  if (!userProfile) {
    let error = new Error("User not found");
    error.status = 404;
    next(error);
    return;
  }
  //cannot unfollow yourself
  if (currentUserId.toString() === userIdToUnfollow.toString()) {
    let error = new Error("You cannot unfollow yourself");
    error.status = 400;
    next(error);
    return;
  }

  //check if the user is already not followed by current user
  if (!currentUser?.following?.includes(userIdToUnfollow)) {
    let error = new Error("You are not following this user");
    error.status = 400;
    next(error);
    return;
  }

  //pull the id of usertounfollow from the following array of current user
  await User.findByIdAndUpdate(
    currentUserId,
    { $pull: { following: userIdToUnfollow } },
    { new: true },
  );
  //pull the id of current user from the followers array of user to unfollow
  await User.findByIdAndUpdate(
    userIdToUnfollow,
    { $pull: { followers: currentUserId } },
    { new: true },
  );
  //save both the documents
  await currentUser.save();
  await userProfile.save();
  //return response
  res.status(200).json({
    status: "success",
    message: `You have unfollowed ${userProfile?.username}`,
  });
});

//forgot password
// route PUT /api/v1/users/forgot-password
// access PUBLIC (anyone can request for password reset)
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  //fetch the email from request body
  const { email } = req.body;
  //find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    let error = new Error("User not found");
    error.status = 404;
    next(error);
    return;
  }
  //get password reset token
  const resetToken = user.generatePasswordResetToken();
  await user.save();
  //send email to user with the reset token
  sendEmail(user.email, resetToken);
  res.status(200).json({
    status: "success",
    message: "Password reset token generated and email sent successfully",
  });
});

//reset password
// route PUT /api/v1/users/reset-password/:resetToken
// access PUBLIC (anyone can reset password with valid token)
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //fetch the reset token from params
  const { resetToken } = req.params;
  //hash the reset token to compare with the hashed token in database
  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //find the user with the hashed reset token and check if the token is not expired
  console.log("Hashed Reset Token: ", hashedResetToken);
  const user = await User.findOne({
    passwordResetToken: hashedResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    let error = new Error("Invalid or expired password reset token");
    error.status = 400;
    next(error);
    return;
  }
  //hash the new password and save it to database
  const { newPassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  //clear the reset token and expiry time
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
});

//account verification
// route PUT /api/v1/users/account-verification-email
// access private
exports.verifyAccountEmail = asyncHandler(async (req, res, next) => {
  //fetch the email
  const currentUser = await User.findById(req?.userAuth?._id);
  if (!currentUser) {
    let error = new Error("User not found");
    error.status = 404;
    next(error);
    return;
  }
  //fetch the verification token from user document
  const verificationToken =
    await currentUser.generateAccountVerificationToken();
  //resave token
  await currentUser.save();
  //send email to user with the verification token
  sendAccountVerificationEmail(currentUser.email, verificationToken);
  res.status(200).json({
    status: "success",
    message: `Account verification email sent successfully to ${currentUser.email}`,
  });
});

//account token verification
// route PUT /api/v1/users/verify-account/:verificationToken
// access private
exports.verifyAccount = asyncHandler(async (req, res, next) => {
  //fetch the verification token from params
  const { verificationToken } = req.params;
  //hash the verification token to compare with the hashed token in database
  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  //find the user with the hashed verification token and check if the token is not expired
  const user = await User.findOne({
    accountVerificationToken: hashedVerificationToken,
    accountVerificationExpires: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    let error = new Error("Invalid or expired account verification token");
    error.status = 400;
    next(error);
    return;
  }
  //mark the user as verified and clear the verification token and expiry time
  user.isVerified = true;
  console.log(user.isVerified);
  user.accountVerificationToken = undefined;
  user.accountVerificationExpires = undefined;
  await user.save();
  console.log(user);
  res.status(200).json({
    status: "success",
    message: "Account verified successfully",
  });
});

//update user profile
// route PUT /api/v1/users/update-profile
// access private (only authenticated users can update their profile)
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.userAuth.id;

  const { username, bio, location, gender } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return next(new Error("User not found"));
  }

  user.username = username || user.username;
  user.bio = bio || user.bio;
  user.location = location || user.location;
  user.gender = gender || user.gender;

  if (req.files?.profilePicture?.[0]) {
    user.profilePicture = req.files.profilePicture[0].url;
  }

  if (req.files?.coverImage?.[0]) {
    user.coverImage = req.files.coverImage[0].url;
  }

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    user,
  });
});

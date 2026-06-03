const express = require('express');
const { 
    register , 
    login , 
    getprofile,
    blockUser, 
    unblockUser, 
    followUser, 
    unfollowUser, 
    viewOtherProfile, 
    forgotPassword, 
    resetPassword ,
    verifyAccountEmail, 
    verifyAccount,
    getPublicProfile,
    updateProfile
} = require('../../controllers/users/userController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const multer = require("multer");
const storage = require("../../utils/fileUpload")
const upload = multer({ storage });
const usersRouter = express.Router();

usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.get('/profile',isLoggedIn, getprofile);
usersRouter.put('/block/:userIdToBlock',isLoggedIn, blockUser);
usersRouter.put('/unblock/:userIdToUnblock',isLoggedIn, unblockUser);
usersRouter.get('/view-other-profile/:userProfileId',isLoggedIn, viewOtherProfile);
usersRouter.put('/follow/:userIdToFollow',isLoggedIn, followUser);
usersRouter.put('/unfollow/:userIdToUnfollow',isLoggedIn, unfollowUser);
usersRouter.put('/forgot-password', forgotPassword);
usersRouter.put('/reset-password/:resetToken', resetPassword);
usersRouter.put('/account-verification-email', isLoggedIn, verifyAccountEmail); 
usersRouter.put('/verify-account/:verificationToken', isLoggedIn, verifyAccount); 
usersRouter.get("/public-profile/:userId", getPublicProfile);

usersRouter.put("/update-profile",isLoggedIn,
    upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = usersRouter;
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    accountLevel: {
        type: String,
        enum: ['bronze', 'silver', 'gold'],
        default: 'bronze'
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverImage: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    notificationType : {
        email: {type: String},
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'prefer not to say', 'non-binary'],
    },
    //other properties will deal with relationships with other models like posts, comments, etc.
    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    accountVerificationToken: {
        type: String,
    },
    accountVerificationExpires: {
        type: Date,
    },
},
    { timestamps: true,
        toJSON: { virtuals: true }, //it is like join in sql
        toObject: { virtuals: true }}
);

userSchema.methods.generatePasswordResetToken = function () {
    //generate token
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
userSchema.methods.generateAccountVerificationToken = function () {
    //generate token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    this.accountVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
    this.accountVerificationExpires = Date.now() + 10 * 60 * 1000;
    return verificationToken;
}

//! converting schema to model
const User = mongoose.model('User', userSchema);
module.exports = User;
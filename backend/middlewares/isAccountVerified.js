const User = require('../models/Users/User');

//middleware to check if account is verified or not
const isAccountVerified = async (req, res, next) => {
    try {
        // find user by id
        const userId = req?.userAuth?.id;
        const user = await User.findById(userId);
        if (!user) {
            let error = new Error("User not found");
            error.status = 404;
            return next(error);
        }
        if (!user.isVerified) {
            let error = new Error("Account not verified. Please verify your account to access this resource.");
            error.status = 403;
            return next(error);
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = isAccountVerified;
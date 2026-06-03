const jwt = require('jsonwebtoken');
const User = require('../models/Users/User');   
const dotenv = require('dotenv');

dotenv.config();
const isLoggedIn =  (req, res, next) => {
    //Fetch the token from the request header
    const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent as "Bearer <token>"
    
    //verify token and decode it
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            const error = new Error(err?.message);
            next(error);
        }else{
            const userid = decoded?.id;
            const user = await User.findById(userid).select(
                "username email role _id"
            );
            req.userAuth = user;
            next();
        }
    });
}

module.exports = isLoggedIn;
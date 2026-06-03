const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shares: {
        type: Number,
        default: 0
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
},
    {  timestamps: true,
        toJSON: { virtuals: true }, //it is like join in sql
        toObject: { virtuals: true }
    }
    
);

//! converting schema to model
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
        trim: true,
        // minlength: 5
    },
    description: {
        type: String,
        trim: true,
    },
    metaTitle: {
        type: String,
        trim: true,
    },
    metaDescription: {
        type: String,
        trim: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
    content: {
        type: String,
        // required: true,
        // minlength: 20
    },
    // saves: [{
    //     type: {
    //         type: String,
    //         enum: ['autosave', 'manual'], // 'autosave' or 'manual' saves
    //         required: true
    //     },
    //     content: {
    //         type: String,
    //         required: true,
    //     },
    //     timestamp: {
    //         type: String, // Store timestamp as string in format 'YYYYMMDD-HHmmss'
    //         required: true
    //     }
    // }],
    isHidden: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pinsList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    saves: [{
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
},
    {
        timestamps: true
    });

const Blog = mongoose.model('Blog', BlogSchema);


module.exports = Blog;



// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
// });

// const Blog = mongoose.model('Blog', blogSchema);

// module.exports = Blog;
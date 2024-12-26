const Blog = require('../models/Blog');
const User = require('../models/User');
const Image = require('../models/User');


exports.getLatest = () => Blog.find()
    .populate('author', 'username')
    .populate('image')
    .sort({ createdAt: -1 });

exports.getPinned = async () => {
    const pins = await Blog.find({ pinsList: { $exists: true, $ne: [] } }).populate('author', 'username').populate('image').sort({ createdAt: -1 }).limit(4).lean();
    return pins;
};

exports.getOnePin = (id) => this.getOne(id).populate('owner').populate('pinsList');

exports.pin = async (blogId, userId) => {
    await Blog.findByIdAndUpdate(blogId, { $push: { pinsList: userId } });
}
exports.unpin = async (blogId, userId) => {
    await Blog.findByIdAndUpdate(blogId, { $pull: { pinsList: userId } });
}
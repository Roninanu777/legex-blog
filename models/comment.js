const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, trim: true }       
},{
    timestamps : true,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
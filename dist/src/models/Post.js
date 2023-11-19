import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true,
    },
    tags: {
        type: Array,
        default: [],
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    imageUrl: String,
}, {
    timestamps: {
        currentTime: () => {
            let date = new Date();
            let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 25 * -1);
            return newDate;
        },
    },
});
export default mongoose.model('Post', PostSchema);
//# sourceMappingURL=Post.js.map
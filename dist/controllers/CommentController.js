import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';
export const createComment = async (req, res) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            post: req.params.id,
        });
        const comment = await doc.save();
        try {
            await PostModel.findByIdAndUpdate(comment.post, {
                $push: { comments: comment._id },
            });
        }
        catch (e) {
            console.log(e);
        }
        console.log(String(comment.post));
        res.json(comment);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось отправить комментарий',
        });
    }
};
export const getComments = async (req, res) => {
    try {
        const comments = await CommentModel.find().limit(3).populate('user').exec();
        res.json(comments);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить комментарии',
        });
    }
};
export const removeComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        CommentModel.findOneAndDelete({ _id: commentId })
            .then((doc) => {
            if (!doc) {
                return res.status(404).json({ message: 'Request comment not found' });
            }
            res.json({
                success: true,
            });
        })
            .catch((err) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: 'Comment not deleted', error: err });
            }
        });
        await PostModel.updateMany({}, { $pull: { comments: commentId } });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'xui tebe',
        });
    }
};
//# sourceMappingURL=CommentController.js.map
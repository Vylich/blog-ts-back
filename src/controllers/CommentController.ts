import express from 'express';
import CommentModel from '../models/Comment.js';
import PostModel from '../models/Post.js';

export const createComment = async (req: any, res: express.Response) => {
  try {
    const doc = new CommentModel({
      text: req.body.text,
      user: req.userId,
      post: req.params.id,
    });

    const comment = await doc.save();
    console.log(comment);

    try {
      await PostModel.findByIdAndUpdate(comment.post, {
        $push: { comments: comment._id },
      });
    } catch (e) {
      console.log(e);
    }

    console.log(String(comment.post));

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось отправить комментарий',
    });
  }
};

export const getComments = async (req: any, res: express.Response) => {
  try {
    const comments = await CommentModel.find().limit(3).populate('user').exec();

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить комментарии',
    });
  }
};
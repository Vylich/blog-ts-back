import express from 'express';
import PostModel from '../models/Post.js';

export const getLastTags = async (req: any, res: express.Response) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const getPostsByTag = async (req: any, res: express.Response) => {
  try {
    const tagName = req.params.id;
    const posts = await PostModel.find({ 'tags': tagName }).populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const getAll = async (req: any, res: express.Response) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const getAllNew = async (req: any, res: express.Response) => {
  try {
    const posts = await PostModel.find()
      .populate('user')
      .sort('-createdAt')
      .exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const getAllPopulate = async (req: any, res: express.Response) => {
  try {
    const posts = await PostModel.find()
      .populate('user')
      .sort('-viewsCount')
      .exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const getOne = async (req: any, res: express.Response) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    )
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({ message: 'Request post not found' });
        }
        res.json(doc);
      })
      .catch((err) => {
        if (err) {
          return res
            .status(403)
            .json({ message: 'Posts not found', error: err });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const remove = async (req: any, res: express.Response) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({ _id: postId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({ message: 'Request post not found' });
        }
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        if (err) {
          return res
            .status(403)
            .json({ message: 'Post not deleted', error: err });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const create = async (req: any, res: express.Response) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(','),
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

export const update = async (req: any, res: express.Response) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags.split(','),
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

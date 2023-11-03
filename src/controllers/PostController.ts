import express from 'express';
import PostModel from '../models/Post.js';

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

export const getOne = async (req: any, res: express.Response) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate({_id: postId}, {$inc: {views: 1}}, {returnDocument: 'after'}).then((doc) => {
      if(!doc) {
          return res.status(404).json({message: 'Request post not found'})
      }
      res.json(doc)
  }).catch((err) => {
      if(err) {
          return res.status(403).json({message: 'Posts not found', error: err})
      }
  })
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

    PostModel.findOneAndDelete({_id: postId}).then((doc) => {
      if(!doc) {
          return res.status(404).json({message: 'Request post not found'})
      }
      res.json({
        success: true,
      })
  }).catch((err) => {
      if(err) {
          return res.status(403).json({message: 'Post not deleted', error: err})
      }
  })
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
      tags: req.body.tags,
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

    await PostModel.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    res.json({
      success: true,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
}
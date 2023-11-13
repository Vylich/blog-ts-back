import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import { Result, ValidationChain, validationResult } from 'express-validator';
import UserModel from '../models/User.js';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const password: string = req.body.password;
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'sofochka131313',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Ne udalos` zaregatsa',
    });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Wrong password or login',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'sofochka131313',
      {
        expiresIn: '30d',
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Unable to login',
    });
  }
};

export const checkMe = async (req: any, res: express.Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Not found user',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

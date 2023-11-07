import express from 'express';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import {
  registerValidator,
  loginValidator,
  postCreateValidation,
} from './validations/validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';

import { UserController, PostController } from './controllers/index.js';

mongoose
  .connect(String(process.env.MONGODB_URI))
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();
const port: number = 5000;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello pidor!');
});

app.post(
  '/auth/login',
  loginValidator,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/auth/reg',
  registerValidator,
  handleValidationErrors,
  UserController.register
);
app.get('/auth/me', checkAuth, UserController.checkMe);

app.post(
  '/upload',
  checkAuth,
  upload.single('image'),
  (req: any, res: express.Response) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  }
);

app.get('/posts', PostController.getAll);
app.get('/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(process.env.PORT || port, () => {
  console.log(`Server on port ${port} ok`);
});

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidator, loginValidator, postCreateValidation, commentCreateValidation, } from './validations/validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController, CommentController, ImageController, } from './controllers/index.js';
mongoose
    .connect('mongodb+srv://ilya:vylich@cluster0.vlxnzsy.mongodb.net/blog')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));
const app = express();
const port = process.env.PORT || 5000;
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("image");
app.use(express.json());
app.use(cors({ origin: '*' }));
// app.use(fileUpload({useTempFiles: true,}))
app.get('/', (req, res) => {
    res.send('Hello pidor!');
});
app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/auth/reg', registerValidator, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.checkMe);
app.post('/upload', uploadMiddleware, ImageController.uploadImage);
app.get('/posts', PostController.getAll);
app.get('/posts/new', PostController.getAllNew);
app.get('/posts/populate', PostController.getAllPopulate);
app.get('/posts/my', checkAuth, PostController.getAllMy);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.post('/comments/:id', checkAuth, commentCreateValidation, CommentController.createComment);
app.get('/comments', CommentController.getComments);
app.delete('/comment/:id', checkAuth, CommentController.removeComment);
app.get('/tags', PostController.getLastTags);
app.get('/tags/:id', PostController.getPostsByTag);
app.get('/posts/:id', PostController.getOne);
app.listen(port, () => {
    console.log(`Server on port ${port} ok`);
});
//# sourceMappingURL=index.js.map
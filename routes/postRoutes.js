import express from 'express';
import multer from 'multer';
import { getAllPosts, createPost, deletePost, editPost } from '../controllers/ postController.js';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname);
      cb(null, `${req.params.id}-${uniqueSuffix}${fileExtension}`);
    },
  });
  
  const upload = multer({ storage: storage });

router.get('/posts', getAllPosts);
router.post(
    '/posts',
    upload.fields([
      { name: 'images', maxCount: 20 }, // Adjust maxCount as needed
      { name: 'videos', maxCount: 20 }, // Adjust maxCount as needed
    ]),
    createPost
  );
router.delete('/posts/:id', deletePost);
router.put('/posts/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), editPost);

export default router;

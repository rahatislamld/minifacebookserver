// postModel.js
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  text: String,
  images: [String], // An array of image URLs
  videos: [String], // An array of video URLs
});

const Post = mongoose.model('Post', postSchema);

export default Post;

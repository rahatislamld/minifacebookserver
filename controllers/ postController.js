import Post from '../models/postModel.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    // Use req.files['images'] and req.files['videos'] for multiple files
    const images = req.files && req.files['images'] ? req.files['images'] : [];
    const videos = req.files && req.files['videos'] ? req.files['videos'] : [];

    const imageUrls = images.map((img) => 'http://localhost:5040/uploads/' + img.filename);
    const videoUrls = videos.map((vid) => 'http://localhost:5040/uploads/' + vid.filename);

    const newPost = new Post({
      text,
      images: imageUrls,
      videos: videoUrls,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Edit a post
export const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const image = req.files && req.files.image ? req.files.image[0].filename : null;
    const video = req.files && req.files.video ? req.files.video[0].filename : null;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { text, image, video },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

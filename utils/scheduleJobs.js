const fs = require('fs');
const Post = require('../models/Post');
const ArchivedPost = require('../models/ArchivedPost');

const checkFileExists = async (file) => {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const archivePosts = async () => {
  // Find expired posts
  const posts = await Post.find({
    expires: {
      $lt: Date.now(),
    },
  });

  // Create archived posts
  await ArchivedPost.insertMany(posts);

  // Move images to archive folder
  posts.forEach((post) => {
    post.images.forEach(async (image) => {
      const directory = `${__dirname}/../uploads/post_images/${image}`;
      const fileExists = await checkFileExists(directory);
      if (fileExists) {
        await fs.promises.rename(
          directory,
          `${__dirname}/../uploads/archive/post_images/${image}`,
        );
      }
    });
  });

  // Delete posts
  await Post.deleteMany({
    expires: {
      $lt: Date.now(),
    },
  });
};

module.exports = {
  archivePosts,
};

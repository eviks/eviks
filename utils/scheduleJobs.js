const fs = require('fs');
const rimraf = require('rimraf');
const Post = require('../models/Post');
const UnreviewedPost = require('../models/UnreviewedPost');
const logger = require('./logger');

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
  const date = Date.now();

  // Find expired posts
  const posts = await Post.find({
    expires: {
      $lt: date,
    },
  });

  // Move images to archive folder
  posts.forEach((post) => {
    post.images.forEach(async (image) => {
      const directory = `${__dirname}/../uploads/post_images/${image}`;
      const fileExists = await checkFileExists(directory);
      if (fileExists) {
        rimraf(directory, (error) => {
          if (error) logger.error(error.message);
        });
      }
    });
  });

  // Delete posts
  await Post.deleteMany({
    expires: {
      $lt: date,
    },
  });
};

const archiveRejectedPosts = async () => {
  // Find expired unreviewed posts
  const posts = await UnreviewedPost.find({
    expires: {
      $lt: Date.now(),
    },
  });

  // Delete all images
  posts.forEach((post) => {
    post.images.forEach(async (image) => {
      const directory = `${__dirname}/../uploads/temp/post_images/${image}`;
      const fileExists = await checkFileExists(directory);
      if (fileExists) {
        rimraf(directory, (error) => {
          if (error) logger.error(error.message);
        });
      }
    });
  });

  // Delete unreviewed posts
  await UnreviewedPost.deleteMany({
    expires: {
      $lt: Date.now(),
    },
  });
};

module.exports = {
  archivePosts,
  archiveRejectedPosts,
};

const fs = require('fs');
const fsExtra = require('fs-extra');
const rimraf = require('rimraf');
const Post = require('../models/Post');
const UnreviewedPost = require('../models/UnreviewedPost');
const ArchivedPost = require('../models/ArchivedPost');
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
        await fsExtra.move(
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

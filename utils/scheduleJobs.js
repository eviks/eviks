const fs = require('fs');
const rimraf = require('rimraf');
const admin = require('firebase-admin');
const FCM = require('fcm-notification');
const Post = require('../models/Post');
const User = require('../models/User');
const UnreviewedPost = require('../models/UnreviewedPost');
const serviceAccount = require('../config/firebase_key.json');
const { setPostsFilters } = require('../middleware/postSearch');
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

  // Delete images
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

const sendSubscriptionNotifications = async () => {
  const certPath = admin.credential.cert(serviceAccount);
  const fcm = new FCM(certPath);

  const users = await User.find({
    devices: { $exists: true, $not: { $size: 0 } },
    subscriptions: { $exists: true, $not: { $size: 0 } },
  });

  const date = Date.now() - (86400 + 600) * 1000; // One day and 10 minutes ago

  users.forEach((user) => {
    user.subscriptions.forEach(async (subscription) => {
      const query = Object.fromEntries(new URLSearchParams(subscription.url));
      const conditions = setPostsFilters({ query });
      const numberOfElements = await Post.find(
        { ...conditions, createdAt: { $gt: date } },
        {},
      )
        .countDocuments()
        .exec();

      const payload = {
        type: 'subscription',
        subscriptionUrl: subscription.url,
      };

      if (numberOfElements > 0) {
        const message = {
          data: {
            user: user.id,
            payload: JSON.stringify(payload),
            title: 'Yeni elanlar var!',
            body: `Bugün ${subscription.name} axtarış parametrləri üzrə ${numberOfElements} dənə yeni elanlar tapıldı`,
          },
        };

        fcm.sendToMultipleToken(message, user.devices, (error) => {
          if (error) {
            logger.error(error);
          }
        });
      }
    });
  });
};

module.exports = {
  archivePosts,
  archiveRejectedPosts,
  sendSubscriptionNotifications,
};

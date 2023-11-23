const fs = require('fs');
const rimraf = require('rimraf');
const Post = require('../models/Post');
const User = require('../models/User');
const UnreviewedPost = require('../models/UnreviewedPost');
const { setPostsFilters } = require('../middleware/postSearch');
const { firebase } = require('../config/firebase');

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
  const users = await User.find({
    devices: { $exists: true, $not: { $size: 0 } },
    subscriptions: {
      $exists: true,
      $not: { $size: 0 },
      $elemMatch: {
        notify: { $exists: true, $eq: true },
      },
    },
  });

  if (!users) return;

  const date = Date.now() - (86400 + 600) * 1000; // One day and 10 minutes ago

  const userMessagesArray = await Promise.all(
    users.map(async (user) => {
      const userMessages = await Promise.all(
        user.subscriptions.map(async (subscription) => {
          if (!subscription.notify) return [];

          const query = Object.fromEntries(
            new URLSearchParams(subscription.url),
          );
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

          const messages = [];
          if (numberOfElements > 0) {
            user.devices.forEach((device) => {
              const message = {
                data: {
                  user: user.id,
                  payload: JSON.stringify(payload),
                },
                token: device,
                notification: {
                  title: 'Yeni elanlar var!',
                  body: `Bugün ${subscription.name} axtarış parametrlər üzrə ${numberOfElements} dənə yeni elanlar tapıldı`,
                },
              };

              messages.push(message);
            });
          }
          return messages;
        }),
      );

      return userMessages.flat(1);
    }),
  );

  const messages = userMessagesArray.flat(1);

  const perChunk = 100;
  const result = messages.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      // eslint-disable-next-line no-param-reassign
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  result.map(async (chunkOfMessages) => {
    try {
      await firebase.messaging().sendEach(chunkOfMessages);
    } catch (error) {
      logger.error(error);
    }
  });
};

module.exports = {
  archivePosts,
  archiveRejectedPosts,
  sendSubscriptionNotifications,
};

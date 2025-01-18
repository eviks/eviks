const express = require('express');
const passport = require('passport');
const { getPaginatedResults } = require('../../utils/pagination');
const logger = require('../../utils/logger');

const Chat = require('../../models/Chat');
const Message = require('../../models/Message');
const Post = require('../../models/Post');

const router = express.Router();

// @route GET api/chats
// @desc  Get chats
// @access Public
router.get(
  '/',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const chats = {};
    let result = [];

    const filters = {
      participants: req.user.id,
    };

    let { page, limit } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const startIndex = (page - 1) * limit;

    try {
      result = await Chat.find(filters).limit(limit).skip(startIndex).sort({
        updatedAt: 1,
      });

      chats.result = result;
      chats.pagination = await getPaginatedResults(Chat, filters, page, limit);

      res.json(chats);
    } catch (error) {
      logger.error(error.message);
      res.status(500).send('Server error...');
    }
  },
);

// @route GET api/chat/:id
// @desc  Get single chat messages
// @access Public
router.get(
  '/chats/:id',
  [passport.authenticate('jwt', { session: false })],
  async (req, res) => {
    const { id } = req.params;

    const chatMessages = { chat: {}, messages: [] };
    let result = [];

    try {
      const filters = {
        _id: id,
        participants: req.user.id,
      };

      const chat = await Chat.find(filters);

      // Chat not found
      if (!chat) {
        return res.status(404).json({ errors: [{ msg: 'Chat not found' }] });
      }

      const messageFilters = { chat: id };

      let { page, limit } = req.query;
      page = parseInt(page, 10);
      limit = parseInt(limit, 10);
      const startIndex = (page - 1) * limit;

      result = await Message.find(messageFilters)
        .limit(limit)
        .skip(startIndex)
        .sort({
          createdAt: -1,
        });

      chatMessages.chat = chat;
      chatMessages.messages = result;
      chatMessages.pagination = await getPaginatedResults(
        Message,
        messageFilters,
        page,
        limit,
      );

      return res.json(chatMessages);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

// @route POST api/chats
// @desc  Create chat
// @access Private
router.post(
  '/',
  [passport.authenticate('jwt', { session: false })],

  async (req, res) => {
    const { postId } = req.params;

    try {
      const filters = { postId, participants: req.user.id };
      const existingChat = await Chat.find(filters);

      if (existingChat) {
        return res.json(existingChat);
      }

      const post = await Post.findById(postId);

      const chat = new Chat({
        post,
        participants: [req.user.id],
      });

      return res.json(chat);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).send('Server error...');
    }
  },
);

module.exports = router;

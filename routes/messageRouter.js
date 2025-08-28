import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const message = new Message(req.body);
  await message.save();
  res.status(201).json({ message: 'Message sent successfully' });
});

export default router;

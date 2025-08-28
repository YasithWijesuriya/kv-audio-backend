import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post('/', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).json(event);
});

export default router;

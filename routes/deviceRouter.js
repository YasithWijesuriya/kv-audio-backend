import express from 'express';
import Device from '../models/Device.js';

const router = express.Router();

// GET all devices
router.get('/', async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});

// POST new device
router.post('/', async (req, res) => {
  const device = new Device(req.body);
  await device.save();
  res.status(201).json(device);
});

export default router;

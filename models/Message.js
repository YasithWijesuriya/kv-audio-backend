import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
  sentAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Message', messageSchema);

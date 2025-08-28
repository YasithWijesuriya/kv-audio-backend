import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  pricePerDay: Number
});

export default mongoose.model('Device', deviceSchema);

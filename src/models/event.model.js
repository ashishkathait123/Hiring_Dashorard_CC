import mongoose, { Schema ,modelNames } from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  userId:{type:Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }
});

export const Event = mongoose.model('Event', eventSchema);


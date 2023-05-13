import mongoose from 'mongoose';

const LastVideo = new mongoose.Schema(
  {
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('lastvideo', LastVideo);
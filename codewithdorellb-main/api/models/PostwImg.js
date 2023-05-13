import mongoose from 'mongoose';

const PostwImg = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    sourceCode: {
      type: String,
    },
    videoLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('postwimg', PostwImg);
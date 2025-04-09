import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    status: {
      type: String,
      enum: ['applied', 'interview', 'offer', 'rejected'],
      default: 'applied',
    },
    appliedDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamps: true }
);

JobSchema.index({ status: 1 });

export default mongoose.model('Job', JobSchema);
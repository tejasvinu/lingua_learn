import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  exercise: mongoose.Types.ObjectId;
  language: mongoose.Types.ObjectId;
  completed: boolean;
  score: number;
  timeSpent: number; // in seconds
  responses: {
    userResponse: string;
    correct: boolean;
    feedback?: string;
  }[];
  session: 'sunrise' | 'sunset';
  completedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: [true, 'Exercise is required'],
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
      required: [true, 'Language is required'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    timeSpent: {
      type: Number,
      default: 0,
    },
    responses: [
      {
        userResponse: String,
        correct: Boolean,
        feedback: String,
      },
    ],
    session: {
      type: String,
      enum: ['sunrise', 'sunset'],
      required: [true, 'Session type is required'],
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for faster queries
ProgressSchema.index({ user: 1, language: 1, completedAt: -1 });

const Progress: Model<IProgress> = mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);

export default Progress; 
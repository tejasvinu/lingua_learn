import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExercise extends Document {
  title: string;
  description: string;
  type: 'speaking' | 'listening' | 'vocabulary';
  language: mongoose.Types.ObjectId;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: {
    text?: string;
    audioUrl?: string;
    imageUrl?: string;
    prompt?: string;
    options?: string[];
  };
  timeEstimate: number; // in seconds
  points: number;
  isActive: boolean;
  requiresSubscription: 'free' | 'premium' | 'pro';
  session: 'sunrise' | 'sunset' | 'any';
}

const ExerciseSchema = new Schema<IExercise>(
  {
    title: {
      type: String,
      required: [true, 'Exercise title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Exercise description is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['speaking', 'listening', 'vocabulary'],
      required: [true, 'Exercise type is required'],
    },
    language: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
      required: [true, 'Language is required'],
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: [true, 'Exercise level is required'],
    },
    content: {
      text: String,
      audioUrl: String,
      imageUrl: String,
      prompt: String,
      options: [String],
    },
    timeEstimate: {
      type: Number,
      default: 60,
    },
    points: {
      type: Number,
      default: 10,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    requiresSubscription: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free',
    },
    session: {
      type: String,
      enum: ['sunrise', 'sunset', 'any'],
      default: 'any',
    },
  },
  { timestamps: true }
);

const Exercise: Model<IExercise> = mongoose.models.Exercise || mongoose.model<IExercise>('Exercise', ExerciseSchema);

export default Exercise; 
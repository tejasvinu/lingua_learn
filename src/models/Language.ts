import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILanguage extends Document {
  name: string;
  code: string;
  flag: string;
  isActive: boolean;
  availableForSubscription: {
    free: boolean;
    premium: boolean;
    pro: boolean;
  };
}

const LanguageSchema = new Schema<ILanguage>(
  {
    name: {
      type: String,
      required: [true, 'Language name is required'],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Language code is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    flag: {
      type: String,
      required: [true, 'Flag emoji is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    availableForSubscription: {
      free: {
        type: Boolean,
        default: false,
      },
      premium: {
        type: Boolean,
        default: true,
      },
      pro: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

const Language: Model<ILanguage> = mongoose.models.Language || mongoose.model<ILanguage>('Language', LanguageSchema);

export default Language; 
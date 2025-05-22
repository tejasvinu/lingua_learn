import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStreakHistory {
  date: Date;
  completed: boolean;
  sunriseCompleted: boolean;
  sunsetCompleted: boolean;
}

export interface IStreak extends Document {
  user: mongoose.Types.ObjectId;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: Date;
  streakHistory: IStreakHistory[];
  updateStreak(session: 'sunrise' | 'sunset'): void;
}

const StreakSchema = new Schema<IStreak>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastPracticeDate: {
      type: Date,
      default: null,
    },
    streakHistory: [
      {
        date: {
          type: Date,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        sunriseCompleted: {
          type: Boolean,
          default: false,
        },
        sunsetCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

// Method to update streak based on practice
StreakSchema.methods.updateStreak = function(session: 'sunrise' | 'sunset'): void {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if we already have an entry for today
  const todayEntry = this.streakHistory.find((entry: IStreakHistory) => {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    return entryDate.getTime() === today.getTime();
  });
  
  if (todayEntry) {
    // Update existing entry
    if (session === 'sunrise') {
      todayEntry.sunriseCompleted = true;
    } else {
      todayEntry.sunsetCompleted = true;
    }
    todayEntry.completed = todayEntry.sunriseCompleted || todayEntry.sunsetCompleted;
  } else {
    // Create new entry for today
    const newEntry = {
      date: today,
      completed: true,
      sunriseCompleted: session === 'sunrise',
      sunsetCompleted: session === 'sunset',
    };
    this.streakHistory.push(newEntry);
  }
  
  // Update last practice date
  this.lastPracticeDate = new Date();
  
  // Check if streak is still valid (practiced yesterday or today)
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const yesterdayEntry = this.streakHistory.find((entry: IStreakHistory) => {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    return entryDate.getTime() === yesterday.getTime();
  });
  
  if (yesterdayEntry?.completed || this.currentStreak === 0) {
    // Increment streak if practiced yesterday or starting new streak
    this.currentStreak += 1;
  } else if (!yesterdayEntry?.completed && this.lastPracticeDate) {
    // Reset streak if missed a day
    this.currentStreak = 1;
  }
  
  // Update longest streak if current is higher
  if (this.currentStreak > this.longestStreak) {
    this.longestStreak = this.currentStreak;
  }
};

const Streak: Model<IStreak> = mongoose.models.Streak || mongoose.model<IStreak>('Streak', StreakSchema);

export default Streak; 
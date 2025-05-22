import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Progress from '@/models/Progress';
import User from '@/models/User';
import Streak from '@/models/Streak';
import { getAuthUser } from '@/lib/auth';
import mongoose from 'mongoose';

// Get user progress
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Check authentication
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get query parameters
    const url = new URL(req.url);
    const language = url.searchParams.get('language');
    const session = url.searchParams.get('session');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    
    // Build query
    const query: any = {
      user: user._id,
    };
    
    if (language) {
      query.language = language;
    }
    
    if (session) {
      query.session = session;
    }
    
    if (startDate || endDate) {
      query.completedAt = {};
      if (startDate) {
        query.completedAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.completedAt.$lte = new Date(endDate);
      }
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const progress = await Progress.find(query)
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('exercise', 'title type level points')
      .populate('language', 'name code flag');
    
    // Get total count for pagination
    const total = await Progress.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      count: progress.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      data: progress,
    });
  } catch (error: any) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get progress' },
      { status: 500 }
    );
  }
}

// Create new progress record
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    // Check authentication
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const { exerciseId, languageId, completed, score, timeSpent, responses, session } = await req.json();
    
    // Validate required fields
    if (!exerciseId || !languageId || !session) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create progress record
    const progress = await Progress.create({
      user: user._id,
      exercise: exerciseId,
      language: languageId,
      completed: completed || false,
      score: score || 0,
      timeSpent: timeSpent || 0,
      responses: responses || [],
      session,
      completedAt: new Date(),
    });
    
    // Update user's streak if exercise is completed
    if (completed) {
      // Find or create streak record
      let streak = await Streak.findOne({ user: user._id });
      
      if (!streak) {
        streak = new Streak({
          user: user._id,
          currentStreak: 0,
          longestStreak: 0,
          lastPracticeDate: null,
          streakHistory: [],
        });
      }
      
      // Update streak
      streak.updateStreak(session);
      await streak.save();
      
      // Update user's language progress
      const userLanguage = user.languages.find(
        lang => lang.language.toString() === languageId
      );
      
      if (userLanguage) {
        userLanguage.lastPracticed = new Date();
        userLanguage.progress += 1;
        userLanguage.streak = streak.currentStreak;
      } else {
        user.languages.push({
          language: new mongoose.Types.ObjectId(languageId),
          level: 'beginner',
          progress: 1,
          streak: streak.currentStreak,
          lastPracticed: new Date(),
        });
      }
      
      await user.save();
    }
    
    return NextResponse.json({
      success: true,
      data: progress,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create progress error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create progress' },
      { status: 500 }
    );
  }
} 
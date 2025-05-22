import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Language from '@/models/Language';
import { getAuthUser } from '@/lib/auth';
import mongoose from 'mongoose';

// Get user's languages
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
    
    // Get user with populated languages
    const userWithLanguages = await User.findById(user._id)
      .select('languages')
      .populate({
        path: 'languages.language',
        model: 'Language',
        select: 'name code flag',
      });
    
    return NextResponse.json({
      success: true,
      data: userWithLanguages?.languages || [],
    });
  } catch (error: any) {
    console.error('Get user languages error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get user languages' },
      { status: 500 }
    );
  }
}

// Add a language to user's profile
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
    
    const { languageId, level = 'beginner' } = await req.json();
    
    // Validate input
    if (!languageId) {
      return NextResponse.json(
        { error: 'Language ID is required' },
        { status: 400 }
      );
    }
    
    // Check if language exists
    const language = await Language.findById(languageId);
    if (!language) {
      return NextResponse.json(
        { error: 'Language not found' },
        { status: 404 }
      );
    }
    
    // Check if language is available for user's subscription
    if (!language.availableForSubscription[user.subscription as keyof typeof language.availableForSubscription]) {
      return NextResponse.json(
        { error: 'Language not available for your subscription level' },
        { status: 403 }
      );
    }
    
    // Check if user already has this language
    const hasLanguage = user.languages.some(
      lang => lang.language.toString() === languageId
    );
    
    if (hasLanguage) {
      return NextResponse.json(
        { error: 'Language already added to your profile' },
        { status: 400 }
      );
    }
    
    // Add language to user's profile
    user.languages.push({
      language: new mongoose.Types.ObjectId(languageId),
      level,
      progress: 0,
      streak: 0,
      lastPracticed: new Date(0),
    });
    
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Language added successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Add language error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add language' },
      { status: 500 }
    );
  }
} 
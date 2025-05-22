import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Exercise from '@/models/Exercise';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Check if user is authenticated to determine subscription level
    const user = await getAuthUser(req);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const subscription = user.subscription;
    
    // Get query parameters
    const url = new URL(req.url);
    const language = url.searchParams.get('language');
    const type = url.searchParams.get('type');
    const level = url.searchParams.get('level');
    const session = url.searchParams.get('session');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const page = parseInt(url.searchParams.get('page') || '1');
    
    // Build query
    const query: any = {
      isActive: true,
    };
    
    if (language) {
      query.language = language;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (level) {
      query.level = level;
    }
    
    if (session) {
      query.session = session === 'any' ? { $in: ['sunrise', 'sunset', 'any'] } : session;
    }
    
    // Filter by subscription level
    if (subscription === 'free') {
      query.requiresSubscription = 'free';
    } else if (subscription === 'premium') {
      query.requiresSubscription = { $in: ['free', 'premium'] };
    }
    // Pro users can access all exercises
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const exercises = await Exercise.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('language', 'name code flag');
    
    // Get total count for pagination
    const total = await Exercise.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      count: exercises.length,
      total,
      pagination: {
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      data: exercises,
    });
  } catch (error: any) {
    console.error('Get exercises error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get exercises' },
      { status: 500 }
    );
  }
} 
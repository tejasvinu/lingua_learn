import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Streak from '@/models/Streak';
import { getAuthUser } from '@/lib/auth';

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
    
    // Get streak data
    const streak = await Streak.findOne({ user: user._id });
    
    if (!streak) {
      return NextResponse.json({
        success: true,
        data: {
          currentStreak: 0,
          longestStreak: 0,
          lastPracticeDate: null,
          streakHistory: [],
        },
      });
    }
    
    // Get query parameters
    const url = new URL(req.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    
    let filteredHistory = streak.streakHistory;
    
    // Filter history by date range if provided
    if (startDate || endDate) {
      filteredHistory = streak.streakHistory.filter(entry => {
        const entryDate = new Date(entry.date);
        
        if (startDate && endDate) {
          return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        } else if (startDate) {
          return entryDate >= new Date(startDate);
        } else if (endDate) {
          return entryDate <= new Date(endDate);
        }
        
        return true;
      });
    }
    
    return NextResponse.json({
      success: true,
      data: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastPracticeDate: streak.lastPracticeDate,
        streakHistory: filteredHistory,
      },
    });
  } catch (error: any) {
    console.error('Get streak error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get streak data' },
      { status: 500 }
    );
  }
} 
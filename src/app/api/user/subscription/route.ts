import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';

// Get user subscription
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
    
    return NextResponse.json({
      success: true,
      data: {
        subscription: user.subscription,
      },
    });
  } catch (error: any) {
    console.error('Get subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get subscription' },
      { status: 500 }
    );
  }
}

// Update user subscription
export async function PATCH(req: NextRequest) {
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
    
    const { subscription } = await req.json();
    
    // Validate subscription value
    if (!subscription || !['free', 'premium', 'pro'].includes(subscription)) {
      return NextResponse.json(
        { error: 'Invalid subscription value' },
        { status: 400 }
      );
    }
    
    // Update subscription
    user.subscription = subscription;
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Subscription updated successfully',
      data: {
        subscription: user.subscription,
      },
    });
  } catch (error: any) {
    console.error('Update subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update subscription' },
      { status: 500 }
    );
  }
} 
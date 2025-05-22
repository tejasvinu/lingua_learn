import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Language from '@/models/Language';
import { getAuthUser } from '@/lib/auth';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = params;
    
    // Check if user is authenticated to determine subscription level
    const user = await getAuthUser(req);
    const subscription = user?.subscription || 'free';
    
    const language = await Language.findById(id);
    
    if (!language) {
      return NextResponse.json(
        { error: 'Language not found' },
        { status: 404 }
      );
    }
    
    // Check if language is available for user's subscription
    if (!language.availableForSubscription[subscription as keyof typeof language.availableForSubscription]) {
      return NextResponse.json(
        { error: 'Language not available for your subscription level' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: language,
    });
  } catch (error: any) {
    console.error('Get language error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get language' },
      { status: 500 }
    );
  }
} 
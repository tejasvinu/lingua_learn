import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Language from '@/models/Language';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // Check if user is authenticated to determine subscription level
    const user = await getAuthUser(req);
    const subscription = user?.subscription || 'free';
    
    // Get query parameters
    const url = new URL(req.url);
    const active = url.searchParams.get('active');
    
    // Build query
    const query: any = {};
    if (active === 'true') {
      query.isActive = true;
    }
    
    // Add subscription filter based on user's subscription level
    query[`availableForSubscription.${subscription}`] = true;
    
    const languages = await Language.find(query).sort({ name: 1 });
    
    return NextResponse.json({
      success: true,
      count: languages.length,
      data: languages,
    });
  } catch (error: any) {
    console.error('Get languages error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get languages' },
      { status: 500 }
    );
  }
} 
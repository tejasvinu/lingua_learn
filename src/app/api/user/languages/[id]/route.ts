import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { getAuthUser } from '@/lib/auth';

interface Params {
  params: {
    id: string;
  };
}

// Update user language settings
export async function PATCH(req: NextRequest, { params }: Params) {
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
    
    const { id } = params;
    const { level } = await req.json();
    
    // Find the language in user's languages array
    const languageIndex = user.languages.findIndex(
      lang => lang.language.toString() === id
    );
    
    if (languageIndex === -1) {
      return NextResponse.json(
        { error: 'Language not found in user profile' },
        { status: 404 }
      );
    }
    
    // Update language level if provided
    if (level) {
      user.languages[languageIndex].level = level;
    }
    
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Language updated successfully',
    });
  } catch (error: any) {
    console.error('Update language error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update language' },
      { status: 500 }
    );
  }
}

// Remove language from user profile
export async function DELETE(req: NextRequest, { params }: Params) {
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
    
    const { id } = params;
    
    // Find the language in user's languages array
    const languageIndex = user.languages.findIndex(
      lang => lang.language.toString() === id
    );
    
    if (languageIndex === -1) {
      return NextResponse.json(
        { error: 'Language not found in user profile' },
        { status: 404 }
      );
    }
    
    // Remove language from array
    user.languages.splice(languageIndex, 1);
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Language removed successfully',
    });
  } catch (error: any) {
    console.error('Remove language error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to remove language' },
      { status: 500 }
    );
  }
} 
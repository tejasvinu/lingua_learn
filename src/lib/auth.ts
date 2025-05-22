import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import User, { IUser } from '@/models/User';
import dbConnect from './mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JwtPayload {
  userId: string;
  email: string;
}

export const generateToken = (user: IUser): string => {
  const payload: JwtPayload = {
    userId: user._id.toString(),
    email: user.email,
  };

  // Reverted to original implementation
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const setAuthCookie = (res: NextResponse, token: string): void => {
  res.cookies.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
};

export const clearAuthCookie = (res: NextResponse): void => {
  res.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
};

export const getAuthUser = async (req: NextRequest): Promise<IUser | null> => {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    await dbConnect();
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = async (req: NextRequest): Promise<boolean> => {
  const user = await getAuthUser(req);
  return !!user;
};

export const getServerAuthSession = async (): Promise<IUser | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    await dbConnect();
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
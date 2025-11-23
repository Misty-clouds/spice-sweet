import { Request, Response, NextFunction } from 'express';
import { getSupabaseWithAuth, supabase } from '../config/supabase';

export interface AuthRequest extends Request {
  user?: any;
  supabase?: any;
  body: any;
  params: any;
  query: any;
  headers: any;
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.substring(7);
    const supabaseWithAuth = getSupabaseWithAuth(token);

    const { data: { user }, error } = await supabaseWithAuth.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    req.supabase = supabaseWithAuth;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const supabaseWithAuth = getSupabaseWithAuth(token);

      const { data: { user } } = await supabaseWithAuth.auth.getUser();

      if (user) {
        req.user = user;
        req.supabase = supabaseWithAuth;
      }
    }

    next();
  } catch (error) {
    next();
  }
};

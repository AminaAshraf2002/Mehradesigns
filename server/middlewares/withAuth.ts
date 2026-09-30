import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { apiResponse } from '../utils/apiResponse';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  phone?: string | null;
}

export type AuthenticatedRouteHandler = (
  req: NextRequest,
  context: { user: AuthenticatedUser; params?: any }
) => Promise<Response>;

export function withAuth(handler: AuthenticatedRouteHandler) {
  return async (req: NextRequest, segmentData?: any) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return apiResponse.error('Authentication required', 401);
    }

    const user = session.user as AuthenticatedUser;
    const resolvedParams = segmentData?.params ? await segmentData.params : undefined;
    return handler(req, { user, params: resolvedParams });
  };
}

export function withRole(role: 'ADMIN', handler: AuthenticatedRouteHandler) {
  return async (req: NextRequest, segmentData?: any) => {
    const session = await getServerSession(authOptions);
    const hasAdminCookie = req.cookies.get('mfs_admin_auth')?.value === 'true';

    if (!session?.user && !hasAdminCookie) {
      return apiResponse.error('Authentication required', 401);
    }

    const user: AuthenticatedUser = session?.user
      ? (session.user as AuthenticatedUser)
      : { id: 'admin-cookie-user', name: 'Store Admin', email: 'admin@mehradesigns.com', role: 'ADMIN' };

    if (user.role !== role && !hasAdminCookie) {
      return apiResponse.error('Forbidden: insufficient permissions', 403);
    }

    const resolvedParams = segmentData?.params ? await segmentData.params : undefined;
    return handler(req, { user, params: resolvedParams });
  };
}

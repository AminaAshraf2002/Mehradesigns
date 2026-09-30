import { NextRequest } from 'next/server';
import { withRole } from '@/server/middlewares/withAuth';
import { handleError } from '@/server/middlewares/handleError';
import { apiResponse } from '@/server/utils/apiResponse';
import { getTrackingConfig, saveTrackingConfig } from '@/lib/tracking';

/**
 * GET /api/admin/tracking
 * Returns the current tracking settings.
 */
export const GET = async () => {
  try {
    const config = await getTrackingConfig();
    return apiResponse.ok(config);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * PUT /api/admin/tracking
 * Protected admin route: Updates Meta Pixel, Google Analytics, and custom tracking codes.
 */
export const PUT = withRole('ADMIN', async (req: NextRequest) => {
  try {
    const body = await req.json();
    const updated = await saveTrackingConfig(body);
    return apiResponse.ok(updated);
  } catch (error) {
    return handleError(error);
  }
});

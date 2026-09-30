import { NextRequest } from 'next/server';
import { withRole } from '@/server/middlewares/withAuth';
import { handleError } from '@/server/middlewares/handleError';
import { adminController } from '@/server/controllers/admin.controller';

// GET can be public or admin so homepage and admin can both query sections
export const GET = async () => {
  try {
    return await adminController.getHomepageSections();
  } catch (error) {
    return handleError(error);
  }
};

export const PUT = withRole('ADMIN', async (req: NextRequest) => {
  try {
    return await adminController.updateHomepageSections(req);
  } catch (error) {
    return handleError(error);
  }
});

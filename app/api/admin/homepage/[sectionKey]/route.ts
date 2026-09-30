import { NextRequest } from 'next/server';
import { handleError } from '@/server/middlewares/handleError';
import { adminController } from '@/server/controllers/admin.controller';

export const GET = async (
  _req: NextRequest,
  context: { params: Promise<{ sectionKey: string }> }
) => {
  try {
    const { sectionKey } = await context.params;
    return await adminController.getSingleHomepageSection({ sectionKey });
  } catch (error) {
    return handleError(error);
  }
};

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ sectionKey: string }> }
) => {
  try {
    const { sectionKey } = await context.params;
    return await adminController.updateSingleHomepageSection(req, { sectionKey });
  } catch (error) {
    return handleError(error);
  }
};

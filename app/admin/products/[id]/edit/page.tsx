'use client';

import React, { use } from 'react';
import { ProductForm } from '@/components/admin/ProductForm';

export default function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  return <ProductForm productId={resolvedParams.id} />;
}

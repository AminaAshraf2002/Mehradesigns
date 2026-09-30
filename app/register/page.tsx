'use client';

import React, { Suspense } from 'react';
import { UserAuthScreen } from '@/components/auth/UserAuthScreen';

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#8C6C43] border-t-transparent animate-spin" />
        </div>
      }
    >
      <UserAuthScreen initialMode="register" />
    </Suspense>
  );
}

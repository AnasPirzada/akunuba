'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InvestmentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/investment/overview');
  }, [router]);

  return null;
}


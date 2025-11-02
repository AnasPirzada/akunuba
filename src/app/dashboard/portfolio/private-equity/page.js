'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GlassCard from '@/components/ui/GlassCard';

export default function PrivateEquityPage() {
  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Private Equity Portfolio
        </h1>
        <p className='text-gray-400'>Manage your private equity investments</p>
      </div>

      <GlassCard className='p-6'>
        <p className='text-gray-400'>Private Equity page coming soon...</p>
      </GlassCard>
    </DashboardLayout>
  );
}


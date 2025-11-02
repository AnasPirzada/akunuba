'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GlassCard from '@/components/ui/GlassCard';

export default function BankingPage() {
  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Banking & Cash
        </h1>
        <p className='text-gray-400'>Manage your banking and cash holdings</p>
      </div>

      <GlassCard className='p-6'>
        <p className='text-gray-400'>Banking & Cash page coming soon...</p>
      </GlassCard>
    </DashboardLayout>
  );
}


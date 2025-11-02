'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GlassCard from '@/components/ui/GlassCard';

export default function EntityStructurePage() {
  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Entity Structure
        </h1>
        <p className='text-gray-400'>Manage your wealth structure</p>
      </div>

      <GlassCard className='p-6'>
        <p className='text-gray-400'>Entity Structure page coming soon...</p>
      </GlassCard>
    </DashboardLayout>
  );
}


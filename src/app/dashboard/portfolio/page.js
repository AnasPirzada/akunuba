'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GlassCard from '@/components/ui/GlassCard';

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Portfolio
        </h1>
        <p className='text-gray-400'>Manage and track your investment portfolio</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <GlassCard className='p-6'>
          <h3 className='text-white font-semibold mb-4'>Total Assets</h3>
          <p className='text-3xl font-bold text-white mb-2'>$124,586.32</p>
          <p className='text-green-400 text-sm'>+12.5% this month</p>
        </GlassCard>

        <GlassCard className='p-6'>
          <h3 className='text-white font-semibold mb-4'>Asset Classes</h3>
          <div className='space-y-3'>
            <AssetItem label='Stocks' value='$56,000' percentage='45%' />
            <AssetItem label='Bonds' value='$31,000' percentage='25%' />
            <AssetItem label='Real Estate' value='$25,000' percentage='20%' />
            <AssetItem label='Crypto' value='$12,500' percentage='10%' />
          </div>
        </GlassCard>

        <GlassCard className='p-6'>
          <h3 className='text-white font-semibold mb-4'>Performance</h3>
          <div className='space-y-3'>
            <MetricItem label='1 Month' value='+5.2%' positive />
            <MetricItem label='3 Months' value='+12.8%' positive />
            <MetricItem label='6 Months' value='+18.5%' positive />
            <MetricItem label='1 Year' value='+24.3%' positive />
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

function AssetItem({ label, value, percentage }) {
  return (
    <div className='flex items-center justify-between text-sm'>
      <span className='text-gray-400'>{label}</span>
      <div className='text-right'>
        <p className='text-white font-medium'>{value}</p>
        <p className='text-gray-500 text-xs'>{percentage}</p>
      </div>
    </div>
  );
}

function MetricItem({ label, value, positive }) {
  return (
    <div className='flex items-center justify-between text-sm'>
      <span className='text-gray-400'>{label}</span>
      <span className={`font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {value}
      </span>
    </div>
  );
}


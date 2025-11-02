'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';

export default function MarketplacePage() {
  const opportunities = [
    {
      name: 'Tech Growth Fund',
      category: 'Mutual Fund',
      minInvestment: '$1,000',
      expectedReturn: '15-20%',
      risk: 'High',
      rating: 4.5,
    },
    {
      name: 'Real Estate Portfolio',
      category: 'Real Estate',
      minInvestment: '$5,000',
      expectedReturn: '8-12%',
      risk: 'Medium',
      rating: 4.8,
    },
    {
      name: 'Corporate Bonds Bundle',
      category: 'Bonds',
      minInvestment: '$2,500',
      expectedReturn: '4-6%',
      risk: 'Low',
      rating: 4.2,
    },
    {
      name: 'Emerging Markets ETF',
      category: 'ETF',
      minInvestment: '$500',
      expectedReturn: '12-18%',
      risk: 'High',
      rating: 4.0,
    },
    {
      name: 'Dividend Aristocrats',
      category: 'Stocks',
      minInvestment: '$1,500',
      expectedReturn: '6-10%',
      risk: 'Medium',
      rating: 4.6,
    },
    {
      name: 'Green Energy Fund',
      category: 'Sustainable',
      minInvestment: '$2,000',
      expectedReturn: '10-15%',
      risk: 'Medium',
      rating: 4.4,
    },
  ];

  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Marketplace
        </h1>
        <p className='text-gray-400'>Discover new investment opportunities</p>
      </div>

      {/* Filters */}
      <div className='flex gap-3 mb-8 overflow-x-auto pb-2'>
        <FilterChip active>All</FilterChip>
        <FilterChip>Mutual Funds</FilterChip>
        <FilterChip>Real Estate</FilterChip>
        <FilterChip>Bonds</FilterChip>
        <FilterChip>ETFs</FilterChip>
        <FilterChip>Stocks</FilterChip>
        <FilterChip>Sustainable</FilterChip>
      </div>

      {/* Opportunities Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {opportunities.map((opportunity, index) => (
          <GlassCard key={index} className='p-6'>
            <div className='flex items-start justify-between mb-4'>
              <span className='px-3 py-1 bg-fullego-gold/20 text-fullego-gold rounded-full text-xs font-medium'>
                {opportunity.category}
              </span>
              <div className='flex items-center gap-1'>
                <StarIcon />
                <span className='text-white text-sm font-medium'>{opportunity.rating}</span>
              </div>
            </div>

            <h3 className='text-white text-lg font-semibold mb-3'>
              {opportunity.name}
            </h3>

            <div className='space-y-2 mb-4'>
              <InfoRow label='Min. Investment' value={opportunity.minInvestment} />
              <InfoRow label='Expected Return' value={opportunity.expectedReturn} />
              <InfoRow 
                label='Risk Level' 
                value={opportunity.risk}
                valueColor={
                  opportunity.risk === 'High' ? 'text-red-400' :
                  opportunity.risk === 'Medium' ? 'text-yellow-400' :
                  'text-green-400'
                }
              />
            </div>

            <GradientButton className='w-full'>
              Invest Now
            </GradientButton>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
}

function FilterChip({ children, active }) {
  return (
    <button
      className={`
        px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
        ${active 
          ? 'bg-fullego-gold text-fullego-dark' 
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
        }
      `}
    >
      {children}
    </button>
  );
}

function InfoRow({ label, value, valueColor = 'text-white' }) {
  return (
    <div className='flex items-center justify-between text-sm'>
      <span className='text-gray-400'>{label}</span>
      <span className={`font-medium ${valueColor}`}>{value}</span>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='#F1CB68' stroke='#F1CB68' strokeWidth='2'>
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  );
}


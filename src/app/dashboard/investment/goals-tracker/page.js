'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function GoalsTrackerPage() {
  const { isDarkMode } = useTheme();

  // Investment Goals Data
  const investmentGoals = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      currentValue: '$4,135.00',
      quantity: '3.0216595255',
      goalCompletion: 95,
      gradient: 'linear-gradient(135deg, #F1CB68 0%, #D4A017 100%)',
      progressColor: '#FF6B35',
    },
    {
      name: 'Litecoin',
      symbol: 'LTC',
      icon: 'Ł',
      currentValue: '$3,236.00',
      quantity: '12.9921124',
      goalCompletion: 62,
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
      progressColor: '#60A5FA',
    },
    {
      name: 'Ripple',
      symbol: 'XRP',
      icon: 'XRP',
      currentValue: '$9,182.00',
      quantity: '210.1120034',
      goalCompletion: 81,
      gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      progressColor: '#60A5FA',
    },
    {
      name: 'Dash',
      symbol: 'DSH',
      icon: 'D',
      currentValue: '$1,251.00',
      quantity: '402.1223950',
      goalCompletion: 36,
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      progressColor: '#34D399',
    },
  ];

  // Marketplace assets
  const marketplaceAssets = [
    {
      index: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      iconColor: 'bg-orange-500/20 text-orange-500',
      price: '$7.000,32',
      change: '+10%',
      changeType: 'positive',
      currentValue: '$7.001,32',
      chartData: [20, 35, 25, 45, 38, 52],
      hasSell: true,
    },
    {
      index: 2,
      name: 'Litecoin',
      symbol: 'LTC',
      icon: 'Ł',
      iconColor: 'bg-teal-500/20 text-teal-500',
      price: '$7.000,32',
      change: '+10%',
      changeType: 'positive',
      currentValue: '$7.001,32',
      chartData: [20, 35, 25, 45, 38, 52],
      hasSell: true,
    },
    {
      index: 3,
      name: 'Ripple',
      symbol: 'RPL',
      icon: 'XRP',
      iconColor: 'bg-blue-500/20 text-blue-500',
      price: '$7.000,32',
      change: '+10%',
      changeType: 'positive',
      currentValue: '$7.001,32',
      chartData: [20, 35, 25, 45, 38, 52],
      hasSell: true,
    },
    {
      index: 4,
      name: 'Dash',
      symbol: 'DSH',
      icon: 'D',
      iconColor: 'bg-green-500/20 text-green-500',
      price: '$7.000,32',
      change: '+10%',
      changeType: 'positive',
      currentValue: '$7.001,32',
      chartData: [20, 35, 25, 45, 38, 52],
      hasSell: true,
    },
    {
      index: 5,
      name: 'DigiDollar',
      symbol: 'BTC',
      icon: 'DD',
      iconColor: 'bg-purple-500/20 text-purple-500',
      price: '$9,250.50',
      change: '+16%',
      changeType: 'positive',
      currentValue: '$5,500.00',
      chartData: [20, 25, 30, 35, 40, 45],
      hasSell: false,
    },
    {
      index: 6,
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      iconColor: 'bg-orange-500/20 text-orange-500',
      price: '$7.000,32',
      change: '+10%',
      changeType: 'positive',
      currentValue: '$7.001,32',
      chartData: [20, 35, 25, 45, 38, 52],
      hasSell: false,
    },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className='mb-8'>
          <h1
            className={`text-3xl md:text-4xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Investment Goals
          </h1>
          <p className='text-gray-400 text-sm md:text-base'>
            Track and manage your cryptocurrency investment goals
          </p>
        </div>

        {/* Investment Goals Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
          {investmentGoals.map((goal, index) => (
            <GoalCard key={index} goal={goal} isDarkMode={isDarkMode} />
          ))}
        </div>

        {/* Marketplace Section */}
        <div>
          <div className='flex items-center justify-between mb-6'>
            <h2
              className={`text-lg font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Marketplace
            </h2>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search all assets'
                className={`pl-10 pr-4 py-2 rounded-lg text-sm border ${
                  isDarkMode
                    ? 'bg-[#2C2C2E] border-[#FFFFFF14] text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
              <svg
                className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                style={{
                  color: isDarkMode ? '#9CA3AF' : '#6B7280',
                }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
          </div>

          <div className='space-y-3'>
            {marketplaceAssets.map((asset, index) => (
              <MarketplaceAssetCard
                key={index}
                asset={asset}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Goal Card Component
function GoalCard({ goal, isDarkMode }) {
  return (
    <div
      className='rounded-2xl p-6 border-0 overflow-hidden relative'
      style={{
        background: goal.gradient,
      }}
    >
      {/* Wavy Pattern Background */}
      <div className='absolute inset-0 opacity-10'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 200 200'
          preserveAspectRatio='none'
        >
          <path
            d='M0,100 Q50,50 100,100 T200,100 L200,200 L0,200 Z'
            fill='white'
          />
          <path
            d='M0,150 Q50,100 100,150 T200,150 L200,200 L0,200 Z'
            fill='white'
          />
        </svg>
      </div>

      <div className='relative z-10'>
        {/* Icon */}
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center'>
            {goal.icon === 'XRP' ? (
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-white' />
                <div className='w-2 h-2 rounded-full bg-white' />
                <div className='w-2 h-2 rounded-full bg-white' />
              </div>
            ) : (
              <span className='text-white font-bold text-lg'>{goal.icon}</span>
            )}
          </div>
          <h3 className='text-white text-lg font-bold'>{goal.name}</h3>
        </div>

        {/* Value */}
        <p className='text-white text-3xl font-bold mb-2'>{goal.currentValue}</p>
        <p className='text-white/80 text-sm mb-4'>{goal.quantity}</p>

        {/* Goal Completion */}
        <div>
          <div className='flex items-center justify-between mb-2'>
            <span className='text-white/80 text-xs font-medium'>
              Goal Completion
            </span>
            <span className='text-white text-xs font-bold'>
              {goal.goalCompletion}%
            </span>
          </div>
          <div className='w-full h-2 bg-white/20 rounded-full overflow-hidden'>
            <div
              className='h-full rounded-full transition-all'
              style={{
                width: `${goal.goalCompletion}%`,
                backgroundColor: goal.progressColor,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Marketplace Asset Card Component
function MarketplaceAssetCard({ asset, isDarkMode }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div
      className={`rounded-xl p-6 border ${
        isDarkMode
          ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4 flex-1'>
          {/* Index */}
          <span
            className={`text-sm font-medium w-8 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {asset.index}
          </span>

          {/* Logo */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${asset.iconColor}`}
          >
            {asset.icon === 'XRP' ? (
              <div className='flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-blue-500' />
                <div className='w-2 h-2 rounded-full bg-blue-500' />
                <div className='w-2 h-2 rounded-full bg-blue-500' />
              </div>
            ) : (
              <span className='text-lg'>{asset.icon}</span>
            )}
          </div>

          {/* Asset Info */}
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-1'>
              <p
                className={`text-base font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {asset.name}
              </p>
              <span
                className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {asset.symbol}
              </span>
            </div>
            <div className='flex items-center gap-4'>
              <p
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {asset.price}
              </p>
              <div className='w-16 h-8'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={asset.chartData.map(v => ({ value: v }))}>
                    <Line
                      type='monotone'
                      dataKey='value'
                      stroke={isDarkMode ? '#8B5CF6' : '#8B5CF6'}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p
                className={`text-sm font-medium ${
                  asset.changeType === 'positive'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {asset.change}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {asset.currentValue}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              asset.hasSell
                ? isDarkMode
                  ? 'bg-[#F1CB68] text-black hover:bg-[#F1CB68]/90'
                  : 'bg-[#F1CB68] text-black hover:bg-[#F1CB68]/90'
                : isDarkMode
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            Buy
          </button>
          {asset.hasSell ? (
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isDarkMode
                  ? 'bg-[#2C2C2E] text-white hover:bg-[#3C3C3E]'
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              Sell
            </button>
          ) : (
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2 ${
                isDarkMode
                  ? 'border-[#FFFFFF14] hover:bg-white/5 text-gray-300'
                  : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill={isSaved ? '#F1CB68' : 'none'}
                stroke={isSaved ? '#F1CB68' : 'currentColor'}
                strokeWidth='2'
              >
                <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
              </svg>
              Save to watchlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

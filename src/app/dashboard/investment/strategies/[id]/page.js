'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StrategyDetailsPage() {
  const { isDarkMode } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  // Strategy data - In a real app, this would come from an API
  const strategies = {
    'lanz-strategy-6': {
      id: 'lanz-strategy-6',
      title: 'LANZ Strategy 6.0',
      description:
        'LANZ Strategy 6.0 — Precision Backtesting Based on 09:00 NY Candle, Dynamic SL/TP, and Lot Size per Trade. LANZ Strategy 6.0 is the simulation version of the original LANZ strategy, designed for high-precision trading with advanced risk management.',
      fullDescription: `LANZ Strategy 6.0 is an advanced trading strategy that focuses on precision backtesting based on the 09:00 NY (New York) candle. This strategy incorporates dynamic stop-loss (SL) and take-profit (TP) mechanisms, along with intelligent lot size management per trade.

Key Features:
- Precision backtesting using 09:00 NY candle as the primary reference point
- Dynamic SL/TP adjustment based on market conditions
- Intelligent lot size calculation per trade
- Risk management optimization
- Simulation-based approach for strategy validation

The strategy is designed to minimize risk while maximizing potential returns through careful analysis of market patterns and trends.`,
      author: 'rau_u_lanz',
      date: 'Jul 21',
      comments: 53,
      boosts: 53,
      chartType: 'candlestick',
      parameters: {
        entryTime: '09:00 NY',
        stopLoss: 'Dynamic',
        takeProfit: 'Dynamic',
        lotSize: 'Per Trade Calculation',
        riskLevel: 'Medium',
      },
    },
    'ny-liquidity-reversal': {
      id: 'ny-liquidity-reversal',
      title: 'NY Liquidity Reversal - Debug',
      description:
        '70 percent 1 rate strategy, no red folder news, trades from only 730 to noon, 20 EMA plus voluntarily breakout, 1 and one entry per direction per session per asset',
      fullDescription: `The NY Liquidity Reversal strategy is designed to capitalize on liquidity reversals during the New York trading session. This strategy operates with a 70% win rate and focuses on high-probability setups.

Key Features:
- 70% win rate optimization
- No trading during red folder news events
- Trading window: 7:30 AM to 12:00 PM NY time
- Uses 20 EMA (Exponential Moving Average) for trend identification
- Voluntary breakout confirmation required
- Maximum one entry per direction per session per asset

This strategy is ideal for traders looking for consistent, low-risk opportunities during the most liquid trading hours.`,
      author: 'Shervoo',
      date: '21 hours ago',
      comments: 53,
      boosts: 53,
      chartType: 'line',
      parameters: {
        entryTime: '7:30 AM - 12:00 PM NY',
        winRate: '70%',
        indicator: '20 EMA',
        newsFilter: 'No Red Folder News',
        maxEntries: '1 per direction per session',
      },
    },
    'sweep-liquidity': {
      id: 'sweep-liquidity',
      title: 'Sweep &',
      description:
        'liquidity and boom, easy 2rr babyyy price always always reverse after LQ.sweep',
      fullDescription: `The Sweep & Liquidity strategy is based on the principle that price tends to reverse after liquidity sweeps. This strategy targets easy 2:1 risk-reward ratios by identifying key liquidity zones.

Key Features:
- Focus on liquidity sweep patterns
- Target 2:1 risk-reward ratio
- Price reversal confirmation after LQ.sweep
- High-probability entry signals
- Simple and effective approach

This strategy is perfect for traders who understand market microstructure and liquidity dynamics.`,
      author: 'anuragfx1',
      date: '20 hours ago',
      comments: 53,
      boosts: 53,
      chartType: 'candlestick',
      parameters: {
        riskReward: '2:1',
        pattern: 'Liquidity Sweep',
        confirmation: 'Price Reversal',
        difficulty: 'Easy',
      },
    },
    'adx-supertrend': {
      id: 'adx-supertrend',
      title: 'ADX + Supertrend Persistent Entry',
      description:
        'buy condition should match below condition below. ADX DI plus should above of DI minuse. Supertrend should be bullish',
      fullDescription: `The ADX + Supertrend Persistent Entry strategy combines two powerful technical indicators to identify strong trending markets with persistent entry signals.

Key Features:
- ADX (Average Directional Index) for trend strength confirmation
- DI+ must be above DI- for bullish signals
- Supertrend indicator for trend direction
- Persistent entry signals for strong trends
- High-probability setups in trending markets

Entry Conditions:
- ADX DI+ must be above DI-
- Supertrend must be bullish (green)
- Both conditions must align for entry

This strategy is ideal for traders who prefer trend-following approaches with clear entry and exit signals.`,
      author: 'rkthakur2610',
      date: 'Jul 21',
      comments: 53,
      boosts: 53,
      chartType: 'candlestick',
      parameters: {
        indicators: 'ADX + Supertrend',
        condition1: 'ADX DI+ > DI-',
        condition2: 'Supertrend Bullish',
        entryType: 'Persistent',
      },
    },
  };

  const strategy = strategies[params.id];

  if (!strategy) {
    return (
      <DashboardLayout>
        <div className='text-center py-12'>
          <h2
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Strategy not found
          </h2>
          <Link
            href='/dashboard/investment/strategies'
            className={`text-[#F1CB68] hover:underline`}
          >
            Back to Strategies
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className={`flex items-center gap-2 mb-6 text-sm transition-colors ${
            isDarkMode
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M19 12H5M12 19l-7-7 7-7' />
          </svg>
          Back to Strategies
        </button>

        {/* Header */}
        <div className='mb-8'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6'>
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {strategy.title}
              </h1>
              <div className='flex items-center gap-3'>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  by
                </span>
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {strategy.author}
                </span>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}
                >
                  •
                </span>
                <span
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {strategy.date}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-3'>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2 ${
                  isSaved
                    ? isDarkMode
                      ? 'border-[#F1CB68] bg-[#F1CB68] text-black'
                      : 'border-[#F1CB68] bg-[#F1CB68] text-black'
                    : isDarkMode
                    ? 'border-[#F1CB68] text-[#F1CB68] hover:bg-[#F1CB68]/10'
                    : 'border-[#F1CB68] text-[#F1CB68] hover:bg-[#F1CB68]/10'
                }`}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill={isSaved ? '#000000' : 'none'}
                  stroke={isSaved ? '#000000' : 'currentColor'}
                  strokeWidth='2'
                >
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
                {isSaved ? 'Saved' : 'Save Strategy'}
              </button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Chart Section */}
            <div
              className={`rounded-2xl border overflow-hidden ${
                isDarkMode
                  ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div
                className={`w-full h-96 ${
                  isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-100'
                } flex items-center justify-center relative overflow-hidden`}
              >
                {/* Placeholder Chart */}
                <div className='w-full h-full flex items-center justify-center'>
                  <svg
                    width='100%'
                    height='100%'
                    viewBox='0 0 800 400'
                    className='absolute inset-0'
                  >
                    <rect
                      width='800'
                      height='400'
                      fill={isDarkMode ? '#0A0A0A' : '#FFFFFF'}
                    />
                    {strategy.chartType === 'candlestick' ? (
                      <>
                        {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
                          <g key={i}>
                            <line
                              x1={x}
                              y1={200 - i * 15}
                              x2={x}
                              y2={200 + i * 8}
                              stroke={isDarkMode ? '#8B5CF6' : '#6366F1'}
                              strokeWidth='3'
                            />
                            <rect
                              x={x - 12}
                              y={200 - i * 15}
                              width='24'
                              height={i * 23}
                              fill={isDarkMode ? '#F1CB68' : '#F1CB68'}
                            />
                          </g>
                        ))}
                      </>
                    ) : (
                      <>
                        <polyline
                          points='100,300 200,250 300,200 400,150 500,120 600,100 700,80'
                          fill='none'
                          stroke={isDarkMode ? '#3B82F6' : '#2563EB'}
                          strokeWidth='3'
                        />
                        <polyline
                          points='100,200 200,180 300,170 400,150 500,140 600,130 700,120'
                          fill='none'
                          stroke={isDarkMode ? '#EF4444' : '#DC2626'}
                          strokeWidth='3'
                        />
                      </>
                    )}
                  </svg>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div
              className={`rounded-2xl border p-6 ${
                isDarkMode
                  ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h2
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Description
              </h2>
              <p
                className={`text-sm leading-relaxed whitespace-pre-line ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {strategy.fullDescription}
              </p>
            </div>

            {/* Parameters Section */}
            <div
              className={`rounded-2xl border p-6 ${
                isDarkMode
                  ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h2
                className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Strategy Parameters
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {Object.entries(strategy.parameters).map(([key, value]) => (
                  <div key={key}>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {String(value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Engagement Metrics */}
            <div
              className={`rounded-2xl border p-6 ${
                isDarkMode
                  ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Engagement
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                      strokeWidth='2'
                    >
                      <path d='M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' />
                    </svg>
                    <span
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Comments
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {strategy.comments}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                      strokeWidth='2'
                    >
                      <path d='M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13' />
                    </svg>
                    <span
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Boosts
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {strategy.boosts}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className={`rounded-2xl border p-6 ${
                isDarkMode
                  ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <h3
                className={`text-lg font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Quick Actions
              </h3>
              <div className='space-y-3'>
                <button
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isDarkMode
                      ? 'bg-[#F1CB68] text-black hover:bg-[#F1CB68]/90'
                      : 'bg-[#F1CB68] text-black hover:bg-[#F1CB68]/90'
                  }`}
                >
                  Apply Strategy
                </button>
                <button
                  className={`w-full px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                    isDarkMode
                      ? 'border-[#FFFFFF14] text-white hover:bg-white/5'
                      : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Share Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


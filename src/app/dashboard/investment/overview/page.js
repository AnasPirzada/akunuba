'use client';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

export default function InvestmentOverviewPage() {
  const { isDarkMode } = useTheme();

  // Chart data for asset cards
  const bitcoinChartData = [
    { value: 20 },
    { value: 35 },
    { value: 25 },
    { value: 45 },
    { value: 38 },
    { value: 52 },
  ];

  const ethereumChartData = [
    { value: 15 },
    { value: 28 },
    { value: 32 },
    { value: 25 },
    { value: 42 },
    { value: 48 },
  ];

  // Activity data
  const activities = [
    {
      icon: 'ethereum',
      transaction: 'Ethereum Purchased',
      amount: '0.0154 ETH',
      total: '$10.00',
      status: 'Pending',
      date: 'February 21, 2023',
    },
    {
      icon: 'bitcoin',
      transaction: 'Bitcoin Purchased',
      amount: '0.3 BTC',
      total: '$10.00',
      status: 'Done',
      date: 'February 14, 2023',
    },
    {
      icon: 'bitcoin',
      transaction: 'Bitcoin Purchased',
      amount: '0.025 BTC',
      total: '$10.00',
      status: 'Done',
      date: 'January 14, 2023',
    },
    {
      icon: 'ethereum',
      transaction: 'Ethereum Purchased',
      amount: '0.1 ETH',
      total: '$150.00',
      status: 'Done',
      date: 'January 10, 2023',
    },
  ];

  // Cryptocurrency price tracker
  const cryptoPrices = [
    {
      name: 'BITCOIN',
      icon: 'bitcoin',
      updated: '5 seconds ago',
      change: '-2.64%',
      changeType: 'negative',
      price: '$12,729',
    },
    {
      name: 'ETHEREUM',
      icon: 'ethereum',
      updated: '10 seconds ago',
      change: '+1.25%',
      changeType: 'positive',
      price: '$2,450',
    },
    {
      name: 'DOGECOIN',
      icon: 'doge',
      updated: '15 seconds ago',
      change: '-0.85%',
      changeType: 'negative',
      price: '$0.085',
    },
  ];

  // Trader profile data
  const traderProfile = {
    name: 'Olivia',
    accountType: 'User Account',
    joined: 'June 22, 2020',
    assetsValue: '$1,328,240.00',
    assets: [
      { name: 'Bitcoin', amount: '23.5 BTC' },
      { name: 'Ethereum', amount: '190.45 ETH' },
      { name: 'Doge', amount: '238,500 DOGE' },
      { name: 'Ripple', amount: '46,100 XRP' },
    ],
  };

  return (
    <DashboardLayout>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Main Content Area */}
        <div className='flex-1'>
          {/* Header */}
          <div className='mb-8'>
            <h1
              className={`text-3xl md:text-4xl font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Investment Overview
            </h1>
            <p className={`text-sm md:text-base ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              For browsing your stocks, Bonds, ETFs, etc.
            </p>
          </div>

          {/* Asset Summary Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8'>
            {/* Bitcoin Card */}
            <AssetCard
              name='Bitcoin'
              value='1,820'
              profit='+1.07%'
              loss='-0.17%'
              neutral='0.00%'
              chartData={bitcoinChartData}
              chartColor='#F1CB68'
              isGradient={true}
              isDarkMode={isDarkMode}
            />

            {/* Ethereum Card */}
            <AssetCard
              name='Ethereum'
              value='1,100'
              profit='+1.07%'
              loss='-0.17%'
              neutral='0.00%'
              chartData={ethereumChartData}
              chartColor='#F1CB68'
              isGradient={false}
              isDarkMode={isDarkMode}
            />

            {/* New Asset Card */}
            <NewAssetCard isDarkMode={isDarkMode} />
          </div>

          {/* Activity Section */}
          <div className='mb-8'>
            <div className='flex items-center justify-between mb-4'>
              <h2
                className={`text-lg font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                ACTIVITY
              </h2>
              <Link
                href='/dashboard/investment/crypto-marketplace'
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                More Activity
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M5 12h14M12 5l7 7-7 7' />
                </svg>
              </Link>
            </div>

            <div
              className={`rounded-2xl border overflow-hidden ${
                isDarkMode
                  ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr
                      className={`border-b ${
                        isDarkMode ? 'border-[#FFFFFF14]' : 'border-gray-200'
                      }`}
                    >
                      <th
                        className={`text-left px-6 py-4 text-xs font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Transactions
                      </th>
                      <th
                        className={`text-left px-6 py-4 text-xs font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Amount
                      </th>
                      <th
                        className={`text-left px-6 py-4 text-xs font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Total
                      </th>
                      <th
                        className={`text-left px-6 py-4 text-xs font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Status
                      </th>
                      <th
                        className={`text-left px-6 py-4 text-xs font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((activity, index) => (
                      <tr
                        key={index}
                        className={`border-b ${
                          isDarkMode ? 'border-[#FFFFFF14]' : 'border-gray-200'
                        } ${
                          index % 2 === 0
                            ? isDarkMode
                              ? 'bg-[#1A1A1D]'
                              : 'bg-gray-50'
                            : ''
                        }`}
                      >
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-3'>
                            <div
                              className={`w-10 h-7 rounded-full flex items-center justify-center ${
                                activity.icon === 'bitcoin'
                                  ? isDarkMode
                                    ? 'bg-orange-500/30 '
                                    : 'bg-orange-500/20'
                                  : isDarkMode
                                  ? 'bg-blue-500/30'
                                  : 'bg-blue-500/20'
                              }`}
                            >
                              {activity.icon === 'bitcoin' ? (
                                <span className='text-orange-500 font-bold text-sm'>
                                  ₿
                                </span>
                              ) : (
                                <span className='text-blue-500 font-bold text-sm'>
                                  Ξ
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {activity.transaction}
                            </span>
                          </div>
                        </td>
                        <td
                          className={`px-6 py-4 text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {activity.amount}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {activity.total}
                        </td>
                        <td className='px-6 py-4'>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              activity.status === 'Done'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}
                          >
                            {activity.status}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {activity.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Cryptocurrency Price Tracker */}
          <div
            className={`rounded-2xl border overflow-hidden ${
              isDarkMode
                ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr
                    className={`border-b ${
                      isDarkMode ? 'border-[#FFFFFF14]' : 'border-gray-200'
                    }`}
                  >
                    <th
                      className={`text-left px-6 py-4 text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Cryptocurrency
                    </th>
                    <th
                      className={`text-left px-6 py-4 text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Updated
                    </th>
                    <th
                      className={`text-left px-6 py-4 text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Change
                    </th>
                    <th
                      className={`text-left px-6 py-4 text-xs font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoPrices.map((crypto, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        isDarkMode ? 'border-[#FFFFFF14]' : 'border-gray-200'
                      }`}
                    >
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              crypto.icon === 'bitcoin'
                                ? isDarkMode
                                  ? 'bg-orange-500/30'
                                  : 'bg-orange-500/20'
                                : crypto.icon === 'ethereum'
                                ? isDarkMode
                                  ? 'bg-blue-500/30'
                                  : 'bg-blue-500/20'
                                : isDarkMode
                                ? 'bg-yellow-500/30'
                                : 'bg-yellow-500/20'
                            }`}
                          >
                            {crypto.icon === 'bitcoin' ? (
                              <span className='text-orange-500 font-bold text-sm'>
                                ₿
                              </span>
                            ) : crypto.icon === 'ethereum' ? (
                              <span className='text-blue-500 font-bold text-sm'>
                                Ξ
                              </span>
                            ) : (
                              <span className='text-yellow-500 font-bold text-sm'>
                                Ð
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {crypto.name}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        {crypto.updated}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`text-sm font-medium ${
                            crypto.changeType === 'positive'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {crypto.changeType === 'negative' && '↓ '}
                          {crypto.changeType === 'positive' && '↑ '}
                          {crypto.change}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {crypto.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trader Profile Sidebar */}
        <div className='w-full lg:w-80 shrink-0'>
          <TraderProfileSidebar
            profile={traderProfile}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

// Asset Card Component
function AssetCard({
  name,
  value,
  profit,
  loss,
  neutral,
  chartData,
  chartColor,
  isGradient,
  isDarkMode,
}) {
  return (
    <div
      className={`rounded-2xl p-6 border overflow-hidden relative ${
        isGradient
          ? ''
          : isDarkMode
          ? 'bg-[#1A1A1D] border-[#FFFFFF14]'
          : 'bg-white border-gray-200'
      }`}
      style={
        isGradient
          ? {
              background: 'linear-gradient(135deg, #F1CB68 0%, #D4A017 100%)',
              border: 'none',
            }
          : {}
      }
    >
      <div className='flex items-start justify-between mb-4'>
        <div>
          <span
            className={`text-4xl font-bold mb-2 block ${
              isGradient
                ? 'text-white'
                : isDarkMode
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            ${value}
          </span>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-green-500 font-medium'>
                {profit}
              </span>
              <span
                className={`text-xs ${
                  isGradient
                    ? 'text-white/80'
                    : isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                Profit
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-xs text-red-500 font-medium'>{loss}</span>
              <span
                className={`text-xs ${
                  isGradient
                    ? 'text-white/80'
                    : isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                Loss
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span
                className={`text-xs font-medium ${
                  isGradient
                    ? 'text-white/80'
                    : isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                {neutral}
              </span>
              <span
                className={`text-xs ${
                  isGradient
                    ? 'text-white/80'
                    : isDarkMode
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                Neutral
              </span>
            </div>
          </div>
        </div>
        <div className='w-24 h-16'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <Line
                type='monotone'
                dataKey='value'
                stroke={isGradient ? '#FFFFFF' : chartColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// New Asset Card Component
function NewAssetCard({ isDarkMode }) {
  return (
    <div
      className={`rounded-2xl p-6 border-2 border-dashed flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition-all ${
        isDarkMode
          ? 'border-gray-600 hover:border-[#F1CB68] bg-[#1A1A1D]'
          : 'border-gray-300 hover:border-[#F1CB68] bg-gray-50'
      }`}
    >
      <p
        className={`text-sm font-medium mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        New Asset
      </p>
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isDarkMode
            ? 'bg-[#2C2C2E] border border-gray-600'
            : 'bg-white border border-gray-300'
        }`}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke={isDarkMode ? '#F1CB68' : '#F1CB68'}
          strokeWidth='2'
        >
          <path d='M12 5v14M5 12h14' />
        </svg>
      </div>
    </div>
  );
}

// Trader Profile Sidebar Component
function TraderProfileSidebar({ profile, isDarkMode }) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        isDarkMode
          ? 'bg-[#1C1C1E] border-[#FFFFFF14]'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className='mb-6'>
        <h2
          className={`text-lg font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Trader Profile
        </h2>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-12 h-12 rounded-full bg-[#F1CB68] flex items-center justify-center'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#000000'
              strokeWidth='2'
            >
              <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M16 7a4 4 0 11-8 0 4 4 0 018 0z' />
            </svg>
          </div>
          <div>
            <p
              className={`text-sm font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {profile.name}
            </p>
            <p
              className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {profile.accountType}
            </p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className='mb-6'>
        <h3
          className={`text-sm font-semibold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Account
        </h3>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span
              className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Joined
            </span>
            <span
              className={`text-xs ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {profile.joined}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <span
              className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Assets Value
            </span>
            <span
              className={`text-xs font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {profile.assetsValue}
            </span>
          </div>
        </div>
      </div>

      {/* Assets List */}
      <div className='mb-6'>
        <h3
          className={`text-sm font-semibold mb-3 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Assets
        </h3>
        <div className='space-y-2'>
          {profile.assets.map((asset, index) => (
            <div key={index} className='flex justify-between items-center'>
              <span
                className={`text-xs ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {asset.name}
              </span>
              <span
                className={`text-xs font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {asset.amount}
              </span>
            </div>
          ))}
        </div>
        <button
          className={`mt-3 text-xs transition-colors ${
            isDarkMode
              ? 'text-gray-400 hover:text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          More assets...
        </button>
      </div>

      {/* Trade Now Button */}
      <button
        className={`w-full py-3 rounded-lg font-medium transition-all ${
          isDarkMode
            ? 'bg-gray-700 text-white hover:bg-gray-600'
            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
        }`}
      >
        Trade Now
      </button>
    </div>
  );
}

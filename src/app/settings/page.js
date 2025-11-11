'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function SettingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'notification';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [notifSubTab, setNotifSubTab] = useState('all');

  const tabs = [
    { id: 'basic', label: 'Basics' },
    { id: 'tasks', label: 'Task & Reminders' },
    { id: 'notification', label: 'Notification' },
  ];


  const notifications = [
    {
      id: 1,
      icon: '/icons/Frame2121453925.svg',

      message: 'Your asset increased by 5% in the past 24 hours.',
      time: '2m ago',
    },
    {
      id: 2,
      icon: '/icons/document-notification.svg',

      message: 'A new document has been shared with you.',
      time: '2m ago',
    },
    {
      id: 3,
      icon: '/icons/Frame2121453925.svg',

      message: 'ETH is now $2400.34.',
      time: '24hrs ago',
    },
    {
      id: 4,
      icon: '/icons/Frame2121453925.svg',

      message: 'AAPL Trade at $458,060.97 was successful.',
      time: '7days ago',
    },
    {
      id: 5,
      icon: '/icons/Frame2121453925.svg',
      iconColor: '#F1CB68',
      message: 'BTC Halving will take place in 4 days.',
      time: '7days ago',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'notification':
        return (
          <div>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
              <h1 className='text-3xl font-bold text-white'>All</h1>
              <button className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors'>
                <Image
                  src='/icons/search.svg'
                  alt='Search'
                  width={20}
                  height={20}
                />
              </button>
            </div>

            {/* Notification Content Card */}
            <div
              className='rounded-2xl overflow-hidden'
              style={{
                background:
                  'linear-gradient(135deg, rgba(30, 30, 35, 0.8) 0%, rgba(20, 20, 25, 0.9) 100%)',
                border: '1px solid rgba(241, 203, 104, 0.3)',
              }}
            >
              {/* Tabs */}
              <div className='flex items-center gap-3 p-6 pb-4'>
                <button
                  onClick={() => setNotifSubTab('all')}
                  className={`flex-1 px-8 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    notifSubTab === 'all'
                      ? 'text-black font-semibold'
                      : 'bg-transparent text-white'
                  }`}
                  style={{
                    background:
                      notifSubTab === 'all'
                        ? 'linear-gradient(90deg, #FFFFFF 0%, #F1CB68 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setNotifSubTab('unread')}
                  className={`flex-1 px-8 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    notifSubTab === 'unread'
                      ? 'text-black font-semibold'
                      : 'bg-transparent text-white'
                  }`}
                  style={{
                    background:
                      notifSubTab === 'unread'
                        ? 'linear-gradient(90deg, #FFFFFF 0%, #F1CB68 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  Unread
                </button>
              </div>

              {/* Notifications List */}
              <div className='px-6 pb-6'>
                {notifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 py-5 ${
                      index !== notifications.length - 1
                        ? 'border-b border-white/5'
                        : ''
                    }`}
                  >
                    {/* Icon */}
                    <div>
                      <Image
                        src={notification.icon}
                        alt='Icon'
                        width={50}
                        height={20}
                      />
                    </div>

                    {/* Content */}
                    <div className='flex-1'>
                      <p className='text-white text-sm mb-2'>
                        {notification.message}
                      </p>
                      <p className='text-gray-400 text-xs'>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'basic':
        return (
          <div>
            {/* Header */}
            <div className='flex items-center gap-2 mb-6 md:mb-8'>
              <Image
                src='/icons/user-icon.svg'
                alt='Profile'
                width={20}
                height={20}
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <h1 className='text-xl md:text-2xl font-bold text-white'>
                Profile information
              </h1>
            </div>

            {/* Profile Form */}
            <div
              className='rounded-2xl p-4 md:p-8'
              style={{
                background:
                  'linear-gradient(135deg, rgba(30, 30, 35, 0.8) 0%, rgba(20, 20, 25, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Profile Picture */}
              <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 md:mb-8'>
                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#F1CB68] flex items-center justify-center shrink-0'>
                  <Image
                    src='/icons/user-avatar.svg'
                    alt='Profile'
                    width={80}
                    height={80}
                  />
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto'>
                  <button
                    className='px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all hover:opacity-90 cursor-pointer whitespace-nowrap'
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                    }}
                  >
                    + Upload new picture
                  </button>
                  <button className='text-gray-400 text-xs md:text-sm hover:text-white transition-colors cursor-pointer'>
                    Remove
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className='space-y-6'>
                {/* Name */}
                <div>
                  <label className='block text-gray-400 text-sm mb-2'>
                    NAME
                  </label>
                  <input
                    type='text'
                    defaultValue='Olivia Benson'
                    className='w-full px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white focus:outline-none focus:border-[#F1CB68] transition-colors'
                  />
                </div>

                {/* Email */}
                <div>
                  <label className='block text-gray-400 text-sm mb-2'>
                    EMAIL
                  </label>
                  <input
                    type='email'
                    defaultValue='hello@gmail.com'
                    className='w-full px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white focus:outline-none focus:border-[#F1CB68] transition-colors'
                  />
                </div>

                {/* Location */}
                <div>
                  <label className='block text-gray-400 text-sm mb-2'>
                    LOCATION
                  </label>
                  <input
                    type='text'
                    defaultValue='United States'
                    className='w-full px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white focus:outline-none focus:border-[#F1CB68] transition-colors'
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className='block text-gray-400 text-sm mb-2'>
                    BIO
                  </label>
                  <textarea
                    rows={4}
                    defaultValue='Lorem ipsum dolor sit amet, consectetur'
                    className='w-full px-4 py-3 rounded-lg bg-transparent border border-white/10 text-white focus:outline-none focus:border-[#F1CB68] transition-colors resize-none'
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div>
            <h1 className='text-3xl font-bold text-white mb-6'>
              Task & Reminders
            </h1>
            <div
              className='rounded-2xl p-8'
              style={{
                background:
                  'linear-gradient(135deg, rgba(30, 30, 35, 0.8) 0%, rgba(20, 20, 25, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <p className='text-gray-400'>
                Task & Reminders content coming soon...
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-[#101014] text-white'>
      <div className='max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8'>
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className='mb-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer'
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Image
            src='/icons/arrow-left.svg'
            alt='Back'
            width={20}
            height={20}
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </button>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6'>
          {/* Tabs - Mobile (Top) / Desktop (Left Sidebar) */}
          <div className='flex lg:flex-col gap-0 lg:gap-3 overflow-x-auto lg:overflow-x-visible scrollbar-hide border-b border-white/10 lg:border-b-0'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`settings-tab relative px-4 lg:px-6 py-3 lg:py-4 lg:rounded-2xl text-sm lg:text-base font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 lg:w-full text-left ${
                  activeTab === tab.id
                    ? 'text-white settings-tab-active'
                    : 'text-gray-400 settings-tab-inactive'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div>{renderContent()}</div>
        </div>
      </div>


      {/* Global Styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Mobile Tab Styles */
        @media (max-width: 1023px) {
          .settings-tab-active {
            border-bottom: 2px solid #ffffff;
          }
          .settings-tab-inactive {
            border-bottom: 2px solid transparent;
          }
        }

        /* Desktop Tab Styles */
        @media (min-width: 1024px) {
          .settings-tab-active {
            background: linear-gradient(
              135deg,
              rgba(30, 30, 35, 0.8) 0%,
              rgba(20, 20, 25, 0.9) 100%
            ) !important;
            border: 1px solid rgba(241, 203, 104, 0.3) !important;
          }
          .settings-tab-inactive {
            background: transparent !important;
            border: 1px solid transparent !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}

'use client';
import { useState } from 'react';

export default function Navbar({ onMenuClick }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <nav className='sticky top-0 z-30 bg-[#101014] border-b border-[#FFFFFF14]'>
      <div className='px-4 md:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          {/* Left Section - Logo */}
          <div className='flex md:hidden items-center gap-4'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
              <img src='/Dashboardlogo.svg' alt='Fullego' className='h-8' />
            </div>
          </div>

          {/* Center Section - Search Bar */}
          <div className='flex-1 max-w-md mx-4 hidden sm:block'>
            <div className='relative w-full lg:w-[260px]'>
              <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                <img
                  src='/icons/search.svg'
                  alt='Search'
                  className='text-gray-500'
                />
              </div>
              <input
                type='text'
                placeholder='Search...'
                className='
                  w-full pl-11 pr-4 py-2 lg:py-3
                  bg-transparent border border-[#2B2B30] rounded-full
                  text-white placeholder-gray-500 text-sm lg:text-base
                  focus:outline-none focus:border-fullego-gold
                  transition-all
                '
              />
            </div>
          </div>

          {/* Right Section */}
          <div className='flex items-center gap-2'>
            {/* Theme Toggle - Desktop Only */}
            <div className='hidden lg:flex w-[110px] h-[56px] items-center justify-between px-[10px] bg-gradient-to-r from-[#222126] to-[#111116] border border-white/10 rounded-[40px]'>
              {/* Moon (Dark Mode) */}
              <button
                onClick={() => setIsDarkMode(true)}
                className={`w-[36px] h-[36px] flex items-center justify-center transition-all duration-300 
    ${
      isDarkMode
        ? 'bg-white rounded-full text-[#101014]'
        : 'bg-transparent text-white'
    }`}
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
                </svg>
              </button>

              {/* Sun (Light Mode) */}
              <button
                onClick={() => setIsDarkMode(false)}
                className={`w-[36px] h-[36px] flex items-center justify-center transition-all duration-300
    ${
      !isDarkMode
        ? 'bg-white rounded-full text-[#101014]'
        : 'bg-transparent text-white'
    }`}
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='12' cy='12' r='5' />
                  <line x1='12' y1='1' x2='12' y2='3' />
                  <line x1='12' y1='21' x2='12' y2='23' />
                  <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
                  <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
                  <line x1='1' y1='12' x2='3' y2='12' />
                  <line x1='21' y1='12' x2='23' y2='12' />
                  <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
                  <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
                </svg>
              </button>
            </div>

            {/* Vertical Divider Line */}
            <div className='hidden lg:block w-[40px] h-0 border-t border-white/10 rotate-90'></div>

            {/* Notifications */}
            <button className=' flex items-center justify-center rounded-full  relative'>
              <img src='/Bell.svg' alt='Notifications' className='w-10 h-10' />
            </button>

            {/* User Profile - Desktop Version */}
            <div className='hidden md:flex w-[213px] h-[56px] items-center gap-3 px-3 bg-gradient-to-r from-[#222126] to-[#111116] border border-white/10 rounded-[40px] shadow-md'>
              <button className='flex items-center gap-[10px] p-1.5 hover:opacity-80 transition-opacity'>
                <div className='w-10 h-10 rounded-full overflow-hidden bg-[#F1CB68] flex items-center justify-center'>
                  <img
                    src='https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170'
                    alt='User'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='flex flex-col justify-center gap-[2px] text-left'>
                  <p className='text-white text-[16px] font-semibold leading-[130%] tracking-[-0.02em] font-[Outfit]'>
                    Olivia
                  </p>
                  <p className='text-white/60 text-[16px] font-normal leading-[130%] tracking-[-0.02em] font-[Outfit]'>
                    User Account
                  </p>
                </div>
              </button>
            </div>

            {/* User Profile - Mobile Version (Avatar Only) */}
            <button className='flex md:hidden w-10 h-10 rounded-full overflow-hidden bg-[#F1CB68] items-center justify-center'>
              <img
                src='https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170'
                alt='User'
                className='w-full h-full object-cover'
              />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className='flex lg:hidden text-white hover:text-gray-300 transition-colors'
            >
              <img
                src='/icons/hamburger.svg'
                alt='Menu'
                className='w-10 h-10 brightness-0 invert'
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Below Main Navbar */}
        <div className='sm:hidden pb-3 pt-1'>
          <div className='relative w-full'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <img
                src='/icons/search.svg'
                alt='Search'
                className='text-gray-500 w-4 h-4'
              />
            </div>
            <input
              type='text'
              placeholder='Search...'
              className='
                w-full pl-10 pr-4 py-2
                bg-transparent border border-[#2B2B30] rounded-full
                text-white placeholder-gray-500 text-sm
                focus:outline-none focus:border-fullego-gold
                transition-all
              '
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

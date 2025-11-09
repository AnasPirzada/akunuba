'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Layout from '../../components/layout/Layout';

const securityPillars = [
  {
    id: 1,
    title: 'Infrastructure Security',
    description:
      'Our systems are hosted on secure cloud infrastructure, protected by network firewalls and regular vulnerability scanning',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3 12h18M3 6h18M3 18h18'
          stroke='#D4AF37'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Account Security',
    description:
      'Utilize features like multi-factor authentication, strong password policies, and secure session management to protect your account.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
          stroke='#D4AF37'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Data Protection',
    description:
      'Your data is encrypted at rest and in transit using industry-leading protocols to keep it safe from unauthorized access.',
    icon: (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='3'
          y='11'
          width='18'
          height='11'
          rx='2'
          ry='2'
          stroke='#D4AF37'
          strokeWidth='2'
        />
        <path
          d='M7 11V7a5 5 0 0 1 10 0v4'
          stroke='#D4AF37'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
];

const SecurityPage = () => {
  return (
    <Layout>
      <div className='min-h-screen bg-[#101014] text-white relative'>
        {/* Background Container */}
        <div className='absolute inset-0 z-0 pointer-events-none overflow-hidden'>
          {/* Background Image */}
          <div className='absolute inset-0'>
            <div className='relative w-full h-full'>
              <Image
                src='/securitybg.png'
                alt='Security Background'
                fill
                className='object-cover'
                priority
              />
            </div>
            {/* Dark Overlay - More focus on background color but lighter */}
            <div className='absolute inset-0 bg-[#101014]/60' />
          </div>

          {/* Grid Pattern Overlay - Covers entire page */}
          <div
            className='absolute inset-0 opacity-20'
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Ellipse 3020 - Golden - Left Middle of Hero */}
          <div
            className='absolute hidden md:block rounded-full'
            style={{
              width: 'clamp(200px, 370px, 30vw)',
              height: 'clamp(300px, 523px, 40vh)',
              left: 'clamp(-100px, -179px, -10%)',
              top: 'clamp(20px, 41px, 5vh)',
              background: 'rgba(212, 175, 55, 0.18)',
              filter: 'blur(124.4px)',
            }}
          />

          {/* Ellipse 3021 - Light Gray - Bottom Right of Hero */}
          <div
            className='absolute hidden md:block rounded-full'
            style={{
              width: 'clamp(200px, 370px, 30vw)',
              height: 'clamp(300px, 523px, 40vh)',
              left: 'clamp(60vw, 1078px, 90vw)',
              top: 'clamp(300px, 394px, 50vh)',
              background: 'rgba(221, 221, 221, 0.18)',
              filter: 'blur(124.4px)',
            }}
          />
        </div>

        {/* Hero Section */}
        <section className='relative z-10 min-h-[500px] md:min-h-[600px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 md:py-32'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'
              style={{
                fontFamily: 'Poppins',
                fontWeight: 700,
              }}
            >
              Your Security is{' '}
              <span
                className='bg-gradient-to-r from-[#D4AF37] to-[#F1CB68] bg-clip-text text-transparent'
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, #FFFFFF 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Our Priority
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed'
              style={{
                fontFamily: 'Outfit',
                fontWeight: 400,
              }}
            >
              We are committed to the highest standards of data protection and
              privacy to ensure your information is always safe and secure with
              us.
            </motion.p>
          </div>
        </section>

        {/* Core Security Pillars Section */}
        <section className='relative z-10 py-12 md:py-20 px-4 sm:px-6 lg:px-8 pb-20'>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='mb-12 md:mb-16'
            >
              <h2
                className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                }}
              >
                Our Core Security Pillars
              </h2>
              <p
                className='text-base md:text-lg text-white/80 max-w-3xl leading-relaxed'
                style={{
                  fontFamily: 'Outfit',
                  fontWeight: 400,
                }}
              >
                We&apos;ve built our platform on three fundamental pillars of
                security to provide comprehensive protection for your data, your
                account, and our infrastructure.
              </p>
            </motion.div>

            {/* Pillar Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {securityPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className='bg-[#1a1a1f]/80 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-8 hover:border-[#D4AF37]/30 transition-all duration-300'
                >
                  {/* Icon Circle */}
                  <div className='mb-6'>
                    <div
                      className='w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#1a1a1f]/50'
                      style={{ borderColor: '#D4AF37' }}
                    >
                      <div className='text-[#D4AF37]'>{pillar.icon}</div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className='text-xl md:text-2xl font-bold text-white mb-4'
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    className='text-base text-white/70 leading-relaxed'
                    style={{
                      fontFamily: 'Outfit',
                      fontWeight: 400,
                    }}
                  >
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SecurityPage;


'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';

export default function SupportPage() {
  const [message, setMessage] = useState('');

  const faqs = [
    {
      question: 'How do I make my first investment?',
      answer: 'Navigate to the Marketplace, choose an investment opportunity that matches your risk profile, and click "Invest Now". Follow the prompts to complete your investment.',
    },
    {
      question: 'How long does verification take?',
      answer: 'Account verification typically takes 24-48 hours. You\'ll receive an email notification once your account is verified.',
    },
    {
      question: 'What are the fees for transactions?',
      answer: 'We charge a flat 0.5% transaction fee for all trades. There are no hidden fees or monthly charges.',
    },
    {
      question: 'How do I withdraw funds?',
      answer: 'Go to Settings > Billing, select "Withdraw Funds", enter the amount, and choose your preferred withdrawal method. Funds typically arrive within 3-5 business days.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Support message:', message);
    alert('Message sent! We\'ll get back to you within 24 hours.');
    setMessage('');
  };

  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Support Center
        </h1>
        <p className='text-gray-400'>We're here to help you succeed</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        {/* Quick Actions */}
        <GlassCard className='p-6 hover:bg-white/5 transition-colors cursor-pointer'>
          <div className='w-12 h-12 bg-fullego-gold/20 rounded-lg flex items-center justify-center mb-4'>
            <MessageIcon />
          </div>
          <h3 className='text-white font-semibold mb-2'>Live Chat</h3>
          <p className='text-gray-400 text-sm'>Chat with our support team in real-time</p>
        </GlassCard>

        <GlassCard className='p-6 hover:bg-white/5 transition-colors cursor-pointer'>
          <div className='w-12 h-12 bg-fullego-gold/20 rounded-lg flex items-center justify-center mb-4'>
            <PhoneIcon />
          </div>
          <h3 className='text-white font-semibold mb-2'>Phone Support</h3>
          <p className='text-gray-400 text-sm'>Call us at +1 (800) 123-4567</p>
        </GlassCard>

        <GlassCard className='p-6 hover:bg-white/5 transition-colors cursor-pointer'>
          <div className='w-12 h-12 bg-fullego-gold/20 rounded-lg flex items-center justify-center mb-4'>
            <BookIcon />
          </div>
          <h3 className='text-white font-semibold mb-2'>Help Center</h3>
          <p className='text-gray-400 text-sm'>Browse our knowledge base</p>
        </GlassCard>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Contact Form */}
        <GlassCard className='p-6'>
          <h2 className='text-lg font-semibold text-white mb-6'>Send us a message</h2>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div>
                <label className='block text-gray-400 text-sm mb-2'>Subject</label>
                <select className='w-full px-4 py-2 bg-white/5 border border-fullego-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fullego-gold'>
                  <option>General Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Account Question</option>
                  <option>Investment Help</option>
                  <option>Billing Question</option>
                </select>
              </div>
              <div>
                <label className='block text-gray-400 text-sm mb-2'>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows='6'
                  placeholder='Describe your issue or question...'
                  className='w-full px-4 py-2 bg-white/5 border border-fullego-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fullego-gold resize-none'
                />
              </div>
              <GradientButton className='w-full'>Send Message</GradientButton>
            </div>
          </form>
        </GlassCard>

        {/* FAQs */}
        <GlassCard className='p-6'>
          <h2 className='text-lg font-semibold text-white mb-6'>Frequently Asked Questions</h2>
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Support Hours */}
      <GlassCard className='p-6 mt-6'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between'>
          <div>
            <h3 className='text-white font-semibold mb-2'>Support Hours</h3>
            <p className='text-gray-400 text-sm'>Monday - Friday: 8:00 AM - 8:00 PM EST</p>
            <p className='text-gray-400 text-sm'>Saturday - Sunday: 10:00 AM - 6:00 PM EST</p>
          </div>
          <div className='mt-4 md:mt-0'>
            <p className='text-gray-400 text-sm mb-2'>Average Response Time</p>
            <p className='text-fullego-gold text-2xl font-bold'>2.5 hours</p>
          </div>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-fullego-border last:border-0 pb-4'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-start justify-between text-left'
      >
        <span className='text-white font-medium pr-4'>{question}</span>
        <ChevronIcon className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <p className='text-gray-400 text-sm mt-3 leading-relaxed'>{answer}</p>
      )}
    </div>
  );
}

function MessageIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='#F1CB68' strokeWidth='2'>
      <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='#F1CB68' strokeWidth='2'>
      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='#F1CB68' strokeWidth='2'>
      <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
      <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
    </svg>
  );
}

function ChevronIcon({ className }) {
  return (
    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className={className}>
      <polyline points='6 9 12 15 18 9' />
    </svg>
  );
}


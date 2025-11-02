'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import OutlineButton from '@/components/ui/OutlineButton';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    marketUpdates: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showPortfolio: false,
    twoFactorAuth: true,
  });

  return (
    <DashboardLayout>
      <div className='mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
          Settings
        </h1>
        <p className='text-gray-400'>Manage your account preferences</p>
      </div>

      <div className='space-y-6'>
        {/* Profile Settings */}
        <GlassCard className='p-6'>
          <h2 className='text-lg font-semibold text-white mb-6'>Profile Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-gray-400 text-sm mb-2'>Full Name</label>
              <input
                type='text'
                defaultValue='John Doe'
                className='w-full px-4 py-2 bg-white/5 border border-fullego-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fullego-gold'
              />
            </div>
            <div>
              <label className='block text-gray-400 text-sm mb-2'>Email</label>
              <input
                type='email'
                defaultValue='john.doe@email.com'
                className='w-full px-4 py-2 bg-white/5 border border-fullego-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fullego-gold'
              />
            </div>
            <div>
              <label className='block text-gray-400 text-sm mb-2'>Phone</label>
              <input
                type='tel'
                defaultValue='+1 (555) 123-4567'
                className='w-full px-4 py-2 bg-white/5 border border-fullego-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fullego-gold'
              />
            </div>
            <div>
              <label className='block text-gray-400 text-sm mb-2'>Country</label>
              <select className='w-full px-4 py-2 bg-white/5 border border-fullego-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-fullego-gold'>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>
            </div>
          </div>
          <div className='flex gap-3 mt-6'>
            <GradientButton>Save Changes</GradientButton>
            <OutlineButton>Cancel</OutlineButton>
          </div>
        </GlassCard>

        {/* Notification Settings */}
        <GlassCard className='p-6'>
          <h2 className='text-lg font-semibold text-white mb-6'>Notifications</h2>
          <div className='space-y-4'>
            <ToggleRow
              label='Email Alerts'
              description='Receive important updates via email'
              checked={notifications.emailAlerts}
              onChange={() => setNotifications({...notifications, emailAlerts: !notifications.emailAlerts})}
            />
            <ToggleRow
              label='Push Notifications'
              description='Get instant notifications on your device'
              checked={notifications.pushNotifications}
              onChange={() => setNotifications({...notifications, pushNotifications: !notifications.pushNotifications})}
            />
            <ToggleRow
              label='Weekly Reports'
              description='Receive weekly portfolio performance reports'
              checked={notifications.weeklyReports}
              onChange={() => setNotifications({...notifications, weeklyReports: !notifications.weeklyReports})}
            />
            <ToggleRow
              label='Market Updates'
              description='Stay informed about market trends'
              checked={notifications.marketUpdates}
              onChange={() => setNotifications({...notifications, marketUpdates: !notifications.marketUpdates})}
            />
          </div>
        </GlassCard>

        {/* Privacy & Security */}
        <GlassCard className='p-6'>
          <h2 className='text-lg font-semibold text-white mb-6'>Privacy & Security</h2>
          <div className='space-y-4 mb-6'>
            <ToggleRow
              label='Profile Visible'
              description='Make your profile visible to other users'
              checked={privacy.profileVisible}
              onChange={() => setPrivacy({...privacy, profileVisible: !privacy.profileVisible})}
            />
            <ToggleRow
              label='Show Portfolio'
              description='Display your portfolio publicly'
              checked={privacy.showPortfolio}
              onChange={() => setPrivacy({...privacy, showPortfolio: !privacy.showPortfolio})}
            />
            <ToggleRow
              label='Two-Factor Authentication'
              description='Add extra security to your account'
              checked={privacy.twoFactorAuth}
              onChange={() => setPrivacy({...privacy, twoFactorAuth: !privacy.twoFactorAuth})}
            />
          </div>
          <div className='pt-4 border-t border-fullego-border'>
            <button className='text-red-400 hover:text-red-300 text-sm font-medium transition-colors'>
              Change Password
            </button>
          </div>
        </GlassCard>

        {/* Danger Zone */}
        <GlassCard className='p-6 border border-red-500/30'>
          <h2 className='text-lg font-semibold text-red-400 mb-2'>Danger Zone</h2>
          <p className='text-gray-400 text-sm mb-4'>These actions cannot be undone</p>
          <div className='flex gap-3'>
            <button className='px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium'>
              Deactivate Account
            </button>
            <button className='px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium'>
              Delete Account
            </button>
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className='flex items-center justify-between py-3 border-b border-fullego-border last:border-0'>
      <div className='flex-1'>
        <p className='text-white font-medium mb-1'>{label}</p>
        <p className='text-gray-400 text-sm'>{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`
          relative w-12 h-6 rounded-full transition-colors
          ${checked ? 'bg-fullego-gold' : 'bg-gray-600'}
        `}
      >
        <span
          className={`
            absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
            ${checked ? 'translate-x-7' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
}


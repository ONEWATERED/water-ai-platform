'use client';

import { useState } from 'react';
import { 
  ShieldCheckIcon, 
  BellIcon, 
  ColorSwatchIcon, 
  LanguageIcon 
} from '@heroicons/react/outline';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true
  });

  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleSecurity = (type: keyof typeof security) => {
    setSecurity(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Account Settings
        </h1>
        <p className="text-blue-600">
          Customize your WaterTech Insights experience
        </p>
      </div>

      <SettingsSection 
        icon={<BellIcon className="h-8 w-8 text-blue-500" />}
        title="Notification Preferences"
        description="Choose how you want to receive updates"
      >
        <div className="space-y-4">
          <ToggleSwitch 
            label="Email Notifications" 
            checked={notifications.email}
            onChange={() => toggleNotification('email')}
          />
          <ToggleSwitch 
            label="Push Notifications" 
            checked={notifications.push}
            onChange={() => toggleNotification('push')}
          />
          <ToggleSwitch 
            label="SMS Notifications" 
            checked={notifications.sms}
            onChange={() => toggleNotification('sms')}
          />
        </div>
      </SettingsSection>

      <SettingsSection 
        icon={<ShieldCheckIcon className="h-8 w-8 text-green-500" />}
        title="Security Settings"
        description="Protect your account with advanced security features"
      >
        <div className="space-y-4">
          <ToggleSwitch 
            label="Two-Factor Authentication" 
            checked={security.twoFactor}
            onChange={() => toggleSecurity('twoFactor')}
          />
          <ToggleSwitch 
            label="Login Alerts" 
            checked={security.loginAlerts}
            onChange={() => toggleSecurity('loginAlerts')}
          />
        </div>
      </SettingsSection>

      <SettingsSection 
        icon={<ColorSwatchIcon className="h-8 w-8 text-purple-500" />}
        title="Appearance"
        description="Customize your dashboard look"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-blue-700 mb-2">Theme</label>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection 
        icon={<LanguageIcon className="h-8 w-8 text-red-500" />}
        title="Language"
        description="Choose your preferred language"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-blue-700 mb-2">Language</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ 
  icon, 
  title, 
  description, 
  children 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  children: React.ReactNode 
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center space-x-4 mb-6">
        {icon}
        <div>
          <h2 className="text-xl font-bold text-blue-900">{title}</h2>
          <p className="text-blue-600">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleSwitch({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string, 
  checked: boolean, 
  onChange: () => void 
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-blue-700">{label}</span>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input 
            type="checkbox" 
            className="sr-only" 
            checked={checked}
            onChange={onChange}
          />
          <div 
            className={`
              w-10 h-4 rounded-full shadow-inner transition
              ${checked ? 'bg-blue-600' : 'bg-gray-300'}
            `}
          ></div>
          <div 
            className={`
              dot absolute -left-1 -top-1 bg-white w-6 h-6 rounded-full 
              shadow transition transform
              ${checked ? 'translate-x-full' : ''}
            `}
          ></div>
        </div>
      </label>
    </div>
  );
}

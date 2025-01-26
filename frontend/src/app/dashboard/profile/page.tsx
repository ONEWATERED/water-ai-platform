'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  interests?: string[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/dashboard/profile', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        setProfile(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err: any) {
        setError('Failed to load profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put('/api/dashboard/profile', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setProfile(response.data);
      setEditMode(false);
    } catch (err: any) {
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Image 
              src={profile?.avatar || '/default-avatar.png'} 
              alt="Profile Avatar" 
              width={120} 
              height={120} 
              className="rounded-full object-cover"
            />
            <button 
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
              onClick={() => {/* Implement avatar upload */}}
            >
              Edit
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              {profile?.name}
            </h1>
            <p className="text-blue-600">{profile?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">
            Profile Details
          </h2>
          <button 
            onClick={() => setEditMode(!editMode)}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {!editMode ? (
          <div className="space-y-4">
            <ProfileField label="Name" value={profile?.name} />
            <ProfileField label="Email" value={profile?.email} />
            <ProfileField label="Bio" value={profile?.bio || 'Not provided'} />
            <ProfileField label="Location" value={profile?.location || 'Not specified'} />
          </div>
        ) : (
          <form className="space-y-4">
            <InputField 
              label="Name" 
              name="name"
              value={formData.name || ''} 
              onChange={handleInputChange}
            />
            <InputField 
              label="Email" 
              name="email"
              value={formData.email || ''} 
              onChange={handleInputChange}
              disabled
            />
            <TextareaField 
              label="Bio" 
              name="bio"
              value={formData.bio || ''} 
              onChange={handleInputChange}
            />
            <InputField 
              label="Location" 
              name="location"
              value={formData.location || ''} 
              onChange={handleInputChange}
            />
            <button 
              type="button"
              onClick={handleSaveProfile}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string, value?: string }) {
  return (
    <div className="border-b pb-3">
      <p className="text-blue-700 font-semibold">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
}

function InputField({ 
  label, 
  name, 
  value, 
  onChange, 
  disabled = false 
}: { 
  label: string, 
  name: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean
}) {
  return (
    <div>
      <label className="block text-blue-700 mb-2">{label}</label>
      <input 
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border border-blue-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      />
    </div>
  );
}

function TextareaField({ 
  label, 
  name, 
  value, 
  onChange 
}: { 
  label: string, 
  name: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void 
}) {
  return (
    <div>
      <label className="block text-blue-700 mb-2">{label}</label>
      <textarea 
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="
          w-full px-4 py-2 border border-blue-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />
    </div>
  );
}

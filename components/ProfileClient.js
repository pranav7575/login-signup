// components/ProfileClient.js
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenLine, Lock, Camera, User, Save, ChevronLeft } from 'lucide-react';

const ProfileClient = ({ user }) => {
  const [userdata, setUserData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: user.id }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.id]);

  useEffect(() => {
    if (userdata.length > 0) {
      setName(userdata[0].name);
      setEmail(userdata[0].email);
      setRole(userdata[0].role);
    }
  }, [userdata]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userid: user.id, name, email, role }),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile data');
      }

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse">Loading profile data...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-slate-800 text-white py-6 px-8 mb-4">
              <h1 className="text-2xl font-bold">Your Profile</h1>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Full Name
                      </div>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      <div className="flex items-center">
                        <PenLine className="h-4 w-4 mr-1" />
                        Email Address
                      </div>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-1" />
                      Role
                    </div>
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button type="button" variant="outline" className="mr-2">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileClient;
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PenLine, Lock, Camera, User } from 'lucide-react';

const Profile = async () => {
  // Fetch the session to get the logged-in user's data
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-4xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Profile</h1>
        
        {/* Main profile card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                {user?.image ? (
                  <img src={user.image} alt="Profile" className="w-16 h-16 rounded-full border-2 border-slate-200" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center">
                    <User size={32} className="text-slate-500" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">{user?.name}</h2>
                  <p className="text-slate-500">{user?.email}</p>
                  <p className="text-sm text-slate-400 mt-1">
                    <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs">
                      {user?.role || 'user'}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <Link href="/profile/edit-photo">
                  <Button className="bg-slate-700 hover:bg-slate-600 text-slate-100 w-full sm:w-auto mb-2 sm:mb-0">
                    <Camera size={16} className="mr-2" /> Update Photo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-medium text-slate-800 mb-6">Account Information</h3>
            
            <div className="space-y-6">
              {/* Personal Details Section */}
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium text-slate-700">Personal Details</h4>
                  <Link href="/profile/edit-details">
                    <Button variant="outline" className="bg-transparent border border-slate-300 hover:bg-slate-100 text-slate-700">
                      <PenLine size={16} className="mr-2" /> Edit
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Full Name</p>
                    <p className="text-slate-800">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="text-slate-800">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Role</p>
                    <p className="text-slate-800">{user?.role || 'user'}</p>
                  </div>
                </div>
              </div>
              
      
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
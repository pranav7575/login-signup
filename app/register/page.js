'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/action/user';
import Link from 'next/link';

const Register = () => {
  const [error, setError] = useState(''); // State to store error messages

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return; // Stop form submission
    }

    // If passwords match, clear any previous error and submit the form
    setError('');
   const responce= await register(formData); // Call the server action
   const error = responce.toString();
   if (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Create an Account</h2>
            
            {/* Display error message if passwords don't match */}
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm text-slate-700">Full Name</Label>
                <Input 
                  type="text" 
                  name="name" 
                  id="name"
                  placeholder="John Doe"
                  className="w-full border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm text-slate-700">Email</Label>
                <Input 
                  type="email" 
                  name="email" 
                  id="email"
                  placeholder="your@email.com"
                  className="w-full border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm text-slate-700">Password</Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="password"
                  placeholder="••••••••"
                  className="w-full border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-sm text-slate-700">Confirm Password</Label>
                <Input 
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="w-full border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 mt-2"
              >
                Create Account
              </Button>
            </form>
          </div>
          
          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-slate-800 hover:text-slate-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
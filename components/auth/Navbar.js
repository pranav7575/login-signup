  import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { auth } from '@/auth';
import { handlesignout } from '@/action/user';

const Navbar = async () => {
  const session = await auth(); // Get the session

  return (
    <nav className="bg-slate-800 shadow-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-slate-100 font-bold text-xl hover:text-white transition-colors">
              Task Scheduler
            </Link>
          </div>     
          <div className="flex items-center space-x-6">
            {/* <Link href="/about" className="text-slate-300 hover:text-white transition-colors text-sm">
              About
            </Link>
            <Link href="/services" className="text-slate-300 hover:text-white transition-colors text-sm">
              Services
            </Link> */}
            
            {session ? (
              <div className="flex items-center space-x-5">
                <div className="text-slate-300 text-sm">
                  Welcome, <span className="font-medium text-slate-100">{session.user?.name}</span>
                </div>
                <Link href="/profile" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Profile
                </Link>
                <Link href="/task" className="text-slate-300 hover:text-white transition-colors text-sm">
                  Task
                </Link>
                <form action={handlesignout}>
                  <Button className="bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm border border-slate-600">
                    Logout
                  </Button>
                </form>
              </div>
            ) : (
              
              <Link href="/login">
                <Button className="bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm border border-slate-600">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
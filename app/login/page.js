'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/action/user'
import Link from 'next/link'
import { githublogin, Googlelogin } from '@/action/user'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'

const Login = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Welcome Back</h2>
                        
                        {/* Login Form */}
                        <form action={login} className="space-y-5">
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
                            
                            <div className="text-right">
                                <Link href="/forgot-password" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            
                            <Button 
                                type="submit" 
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2"
                            >
                                Sign In
                            </Button>
                        </form>
                        
                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-500">Or continue with</span>
                            </div>
                        </div>
                        
                        {/* Social Logins */}
                        <div className="grid grid-cols-2 gap-3">
                            <form action={githublogin}>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                                >
                                    <IconBrandGithub className="mr-2" size={18} />
                                    <span>GitHub</span>
                                </Button>
                            </form>
                            
                            <form action={Googlelogin}>
                                <Button 
                                    type="submit" 
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                                >
                                    <IconBrandGoogle className="mr-2" size={18} />
                                    <span>Google</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="border-t border-slate-200 bg-slate-50 p-4 text-center">
                        <p className="text-sm text-slate-600">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-medium text-slate-800 hover:text-slate-600 transition-colors">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
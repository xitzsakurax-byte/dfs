'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

import { ADMIN } from '@/lib/config';

const ADMIN_USERNAME = ADMIN.USERNAME;
const ADMIN_PASSWORD = ADMIN.PASSWORD;
const ADMIN_EMAIL = ADMIN.EMAIL;

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup' | 'admin'>('signin');
  const [loading, setLoading] = useState(false);

  // Sign in fields
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  // Sign up fields: login name (username), full name, email, password
  const [signupUsername, setSignupUsername] = useState('');
  const [signupFullName, setSignupFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Admin fields
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const supabase = createClient();
  const supabaseReady = !!supabase;

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseReady) {
      return;
    }
    if (!signinEmail || !signinPassword) {
      toast.error('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signinEmail,
        password: signinPassword,
      });
      if (error) throw error;
      toast.success('Signed in successfully.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseReady) {
      return;
    }
    if (!signupUsername || !signupFullName || !signupEmail || !signupPassword) {
      toast.error('Please fill in all fields: Login Name, Full Name, Email, Password.');
      return;
    }
    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            name: signupFullName,  // for the handle_new_user trigger to set display_name
            username: signupUsername,
            full_name: signupFullName,
          },
        },
      });
      if (error) throw error;

      // Profile is auto-created by the database trigger (handle_new_user) using the 'name' metadata.
      // No manual upsert here to avoid RLS/permission issues before the user is fully authenticated.

      toast.success('Account created! Please check your email to confirm if required, then sign in.');
      setMode('signin');
      // Clear form
      setSignupUsername('');
      setSignupFullName('');
      setSignupEmail('');
      setSignupPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    if (adminUsername !== ADMIN_USERNAME || adminPassword !== ADMIN_PASSWORD) {
      toast.error('Invalid admin credentials.');
      return;
    }
    if (!supabaseReady) {
      return;
    }
    setLoading(true);
    try {
      // Sign in as the admin user using the fixed admin email + the provided password
      const { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });
      if (error) throw error;

      toast.success('Admin access granted. Welcome, Kiet.');
      router.push('/admin');
    } catch (err: any) {
      toast.error(err.message || 'Admin login failed. Make sure the admin user exists in Supabase with the correct email and password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0D14] text-[#F5F7FA] px-6">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="logo-mark flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#111418] to-[#C8102E] text-white font-black text-4xl tracking-tighter border border-[rgba(244,196,48,.35)]">GF</div>
            <span className="font-black text-4xl tracking-tighter">GermanForge</span>
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {mode === 'signin' && 'Sign in to your account'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'admin' && 'Admin Access'}
          </h1>
          <p className="text-[#A8B3C7] mt-2 text-sm">
            {mode === 'admin' 
              ? 'Restricted area. Authorized personnel only.' 
              : 'Track your personal progress securely in the database.'}
          </p>
        </div>

        {/* Mode tabs */}
        <div className="flex mb-6 border-b border-[#2C303A]">
          <button 
            onClick={() => setMode('signin')} 
            className={`flex-1 py-2 text-sm font-medium ${mode === 'signin' ? 'text-[#F4C430] border-b-2 border-[#F4C430]' : 'text-[#8F95A3]'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setMode('signup')} 
            className={`flex-1 py-2 text-sm font-medium ${mode === 'signup' ? 'text-[#F4C430] border-b-2 border-[#F4C430]' : 'text-[#8F95A3]'}`}
          >
            Create Account
          </button>
          <button 
            onClick={() => setMode('admin')} 
            className={`flex-1 py-2 text-sm font-medium ${mode === 'admin' ? 'text-[#F4C430] border-b-2 border-[#F4C430]' : 'text-[#8F95A3]'}`}
          >
            Admin
          </button>
        </div>

        {/* Big, clear banner when Supabase is not configured (this is what the user is seeing) */}
        {!supabaseReady && (
          <div className="mb-6 rounded-2xl border border-[#8B1E3D] bg-[#2a1a1a] p-5 text-sm">
            <div className="font-semibold text-[#F4C430] mb-2">Authentication is not configured on this deployment.</div>
            <div className="text-[#C5CAD6] space-y-1">
              <p>To make sign up, sign in, the game rewards, progress tracking, and the admin dashboard work:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Go to your Vercel project → <strong>Settings → Environment Variables</strong></li>
                <li>Add these two variables (for Production and Preview):</li>
                <li className="ml-4 font-mono text-xs bg-black/40 p-1 rounded">NEXT_PUBLIC_SUPABASE_URL = https://your-project-ref.supabase.co</li>
                <li className="ml-4 font-mono text-xs bg-black/40 p-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOi...</li>
                <li>Save, then click <strong>Redeploy</strong> (or push any change).</li>
              </ol>
              <p className="mt-3 text-xs text-[#8F95A3]">Once the variables are set and the site redeploys, this page will become fully functional.</p>
            </div>
          </div>
        )}

        {/* Sign In Form (normal users - email) */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={signinEmail}
              onChange={(e) => setSigninEmail(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              disabled={loading || !supabaseReady}
            />
            <input
              type="password"
              placeholder="Password"
              value={signinPassword}
              onChange={(e) => setSigninPassword(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              disabled={loading || !supabaseReady}
            />
            <Button type="submit" disabled={loading || !supabaseReady} className="w-full text-lg py-6 rounded-3xl btn-primary opacity-100 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <p className="text-center text-sm text-[#8F95A3]">
              New here? <button type="button" onClick={() => setMode('signup')} className="text-[#F4C430] underline">Create an account</button>
            </p>
          </form>
        )}

        {/* Sign Up Form */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              placeholder="Login Name (username)"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              disabled={loading || !supabaseReady}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={signupFullName}
              onChange={(e) => setSignupFullName(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              disabled={loading || !supabaseReady}
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              disabled={loading || !supabaseReady}
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              minLength={6}
              disabled={loading || !supabaseReady}
            />
            <Button type="submit" disabled={loading || !supabaseReady} className="w-full text-lg py-6 rounded-3xl btn-primary opacity-100 disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
            <p className="text-center text-sm text-[#8F95A3]">
              Already have an account? <button type="button" onClick={() => setMode('signin')} className="text-[#F4C430] underline">Sign in</button>
            </p>
          </form>
        )}

        {/* Admin Access - special hardcoded */}
        {mode === 'admin' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#2a1a1a] border border-[#8B1E3D]/50 text-sm text-[#F4C430]">
              This area is restricted. Use the provided admin credentials only.
            </div>
            <input
              type="text"
              placeholder="Admin Username"
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              disabled={loading || !supabaseReady}
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
              required
              disabled={loading || !supabaseReady}
            />
            <Button type="submit" disabled={loading || !supabaseReady} className="w-full text-lg py-6 rounded-3xl bg-[#8B1E3D] hover:bg-[#a02a4a] opacity-100 disabled:opacity-50">
              {loading ? 'Verifying...' : 'Access Admin Dashboard'}
            </Button>
            <p className="text-center text-xs text-[#64748b]">
              Normal users: use Sign In or Create Account above.
            </p>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-[#8F95A3] hover:text-[#EDEEF2]">Back to home</Link>
        </div>
      </div>
    </div>
  );
}

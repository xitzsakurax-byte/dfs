'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ADMIN } from '@/lib/config';

const ADMIN_EMAIL = ADMIN.EMAIL;

interface UserData {
  id: string;
  display_name: string | null;
  total_xp: number;
  current_streak: number;
  mastered_bank: string[];
  updated_at: string;
  username?: string;
}

interface ActivitySummary {
  totalUsers: number;
  totalXp: number;
  totalWordsMastered: number;
  recentUsers: UserData[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<ActivitySummary | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);

  const supabase = createClient();

  useEffect(() => {
    async function checkAdminAndLoad() {
      setLoading(true);
      if (!supabase) {
        toast.error('Authentication service not available.');
        router.push('/login');
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();

      if (!user || user.email !== ADMIN_EMAIL) {
        toast.error('Access denied. Admin credentials required.');
        router.push('/login');
        return;
      }

      setIsAdmin(true);

      // Load data - note: due to RLS, this may only return the admin's data unless policies allow admin read-all.
      // For full access in production, add RLS policy like:
      // CREATE POLICY "Admin read all" ON profiles FOR SELECT USING (auth.jwt() ->> 'email' = 'kiet.ngn369@admin.germanforge');
      // Similar for daily_progress and writing_attempts.

      try {
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .order('updated_at', { ascending: false });

        if (profilesError) throw profilesError;

        const profiles = (profilesData || []) as any[];

        // Calculate summary
        const totalUsers = profiles.length;
        const totalXp = profiles.reduce((sum, p) => sum + (p.total_xp || 0), 0);
        const totalWordsMastered = profiles.reduce((sum, p) => {
          const bank = Array.isArray(p.mastered_bank) ? p.mastered_bank.length : 0;
          return sum + bank;
        }, 0);

        const recentUsers = profiles.slice(0, 10).map(p => ({
          id: p.id,
          display_name: p.display_name,
          total_xp: p.total_xp || 0,
          current_streak: p.current_streak || 0,
          mastered_bank: Array.isArray(p.mastered_bank) ? p.mastered_bank : [],
          updated_at: p.updated_at,
          username: p.username || (p.display_name ? p.display_name.toLowerCase().replace(/\s+/g, '') : 'user'),
        }));

        setSummary({
          totalUsers,
          totalXp,
          totalWordsMastered,
          recentUsers,
        });
        setUsers(recentUsers);

        // Optional: fetch some writing or daily counts for more "traffic" info
        const { data: writingCount } = await supabase
          .from('writing_attempts')
          .select('id', { count: 'exact', head: true });

        // You can expand here with more aggregates if RLS permits

      } catch (err: any) {
        console.error(err);
        toast.error('Could not load all user data. Check RLS policies for admin access.');
        // Fallback to at least show current admin data
        const { data: selfProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (selfProfile) {
          const adminUser = {
            id: selfProfile.id,
            display_name: selfProfile.display_name || 'Admin',
            total_xp: selfProfile.total_xp || 0,
            current_streak: selfProfile.current_streak || 0,
            mastered_bank: Array.isArray(selfProfile.mastered_bank) ? selfProfile.mastered_bank : [],
            updated_at: selfProfile.updated_at,
            username: 'kiet.ngn369',
          };
          setUsers([adminUser]);
          setSummary({
            totalUsers: 1,
            totalXp: adminUser.total_xp,
            totalWordsMastered: adminUser.mastered_bank.length,
            recentUsers: [adminUser],
          });
        }
      } finally {
        setLoading(false);
      }
    }

    checkAdminAndLoad();
  }, [router, supabase]);

  if (!isAdmin && !loading) {
    return null; // Redirected already
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="text-[#8B1E3D] text-xs tracking-[3px]">RESTRICTED • ADMIN ONLY</div>
            <h1 className="text-4xl font-semibold tracking-tight">Admin Dashboard</h1>
            <p className="text-[#A8B3C7] mt-1">Website traffic and user information • Private area</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="text-sm text-[#8F95A3] hover:text-[#EDEEF2]">← Back to main site</Link>
            <Button 
              onClick={async () => {
                await supabase.auth.signOut();
                toast.success('Signed out from admin.');
                window.location.href = '/login';
              }} 
              variant="outline" 
              className="text-sm"
            >
              Sign Out
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading admin data...</div>
        ) : summary ? (
          <>
            {/* Traffic Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="practice-card p-6">
                <div className="text-xs text-[#8F95A3] mb-1">TOTAL REGISTERED USERS</div>
                <div className="text-5xl font-semibold tabular-nums tracking-tighter">{summary.totalUsers}</div>
              </div>
              <div className="practice-card p-6">
                <div className="text-xs text-[#8F95A3] mb-1">TOTAL XP AWARDED (ALL USERS)</div>
                <div className="text-5xl font-semibold tabular-nums tracking-tighter">{summary.totalXp}</div>
              </div>
              <div className="practice-card p-6">
                <div className="text-xs text-[#8F95A3] mb-1">TOTAL WORDS MASTERED (ALL USERS)</div>
                <div className="text-5xl font-semibold tabular-nums tracking-tighter">{summary.totalWordsMastered}</div>
              </div>
            </div>

            {/* Users Information */}
            <div className="practice-card p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs tracking-[2px] text-[#8B1E3D]">USER DIRECTORY</div>
                  <div className="text-2xl font-semibold tracking-tight">All user accounts and progress</div>
                </div>
                <div className="text-sm text-[#8F95A3]">Data stored securely in Supabase</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#2C303A] text-left text-[#8F95A3]">
                      <th className="py-3 pr-4">Login Name</th>
                      <th className="py-3 pr-4">Full Name</th>
                      <th className="py-3 pr-4">Level</th>
                      <th className="py-3 pr-4">XP</th>
                      <th className="py-3 pr-4">Streak</th>
                      <th className="py-3 pr-4">Words Mastered</th>
                      <th className="py-3">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr><td colSpan={7} className="py-6 text-center text-[#8F95A3]">No user data visible (check RLS policies for admin read access).</td></tr>
                    ) : (
                      users.map((u, idx) => {
                        const level = Math.max(1, Math.floor((u.total_xp || 0) / 180) + 1);
                        const words = Array.isArray(u.mastered_bank) ? u.mastered_bank.length : 0;
                        const last = u.updated_at ? new Date(u.updated_at).toLocaleDateString() : '—';
                        return (
                          <tr key={idx} className="border-b border-[#2C303A] hover:bg-[#171A21]">
                            <td className="py-3 pr-4 font-medium text-[#F4C430]">{u.username || 'user'}</td>
                            <td className="py-3 pr-4">{u.display_name || '—'}</td>
                            <td className="py-3 pr-4">Lv.{level}</td>
                            <td className="py-3 pr-4 tabular-nums">{u.total_xp || 0}</td>
                            <td className="py-3 pr-4 tabular-nums">{u.current_streak || 0}</td>
                            <td className="py-3 pr-4 tabular-nums">{words}</td>
                            <td className="py-3 text-[#8F95A3]">{last}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-xs text-[#8F95A3]">
                Each user has isolated personal data (mastered words, XP, streaks, daily history, writing attempts) tied to their Supabase auth ID. No mixing.
              </div>
            </div>

            <div className="text-xs text-center text-[#64748b]">
              This dashboard is only accessible via the exact admin credentials. All sensitive user data lives in the Supabase database with RLS.
            </div>
          </>
        ) : (
          <div className="text-center">No data loaded.</div>
        )}
      </div>
    </div>
  );
}

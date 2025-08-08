"use client"

import { useEffect } from 'react';
import { useAuth } from '@/Context/AuthContext.jsx';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Sidebar, SidebarBody } from '@/components/ui/sidebar'; // Your sidebar components
import { NavUser } from '@/components/NavUser'; // Your updated NavUser component

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // This is your sidebar layout structure
  return (
    <div className="flex">
      <Sidebar>
        <SidebarBody>
           {/* Your other sidebar items go here */}
        </SidebarBody>
        <NavUser /> {/* Place your user button here */}
      </Sidebar>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
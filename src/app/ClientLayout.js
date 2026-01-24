"use client"

import { usePathname, useRouter } from 'next/navigation'
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import DashButton from '@/components/common/DashButton';
import { useAuthStore } from '@/libs/auth';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const hideNavbarFooter = pathname === '/admin-panel' || pathname === '/login' || pathname === '/register' || pathname === '/Unauthorized';
  const { isAdmin } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  
  console.log("is admin???: ", isAdmin)
  
  useEffect(() => {
    // Check authorization before rendering protected routes
    if (pathname === '/admin-panel') {
      if (!isAdmin) {
        console.log("Redirecting unauthorized user from admin-panel...");
        router.push('/Unauthorized');
        return;
      }
    }
    // Mark as ready to render after auth check
    setIsReady(true);
  }, [pathname, isAdmin, router]);

  // Prevent flash of admin panel by not rendering children until auth check is complete
  // For admin-panel route, wait until ready state; for other routes, render immediately
  if (pathname === '/admin-panel' && !isReady) {
    return null;
  }

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      {children}
      
      {!hideNavbarFooter && <Footer />}
    </>
  )
}

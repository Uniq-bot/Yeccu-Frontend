"use client"

import { usePathname, useRouter } from 'next/navigation'
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import DashButton from '@/components/common/DashButton';
import { useAuthStore } from '@/libs/auth';
import { useEffect } from 'react';

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const hideNavbar = pathname === '/admin-panel'
  const { isAdmin } = useAuthStore();

  useEffect(() => {
    // Only redirect from admin-panel if not authenticated
    if (pathname === '/admin-panel' && !isAdmin) {
      console.log("Redirecting unauthorized user from admin-panel...");
      router.push('/');
    }
  }, [pathname, isAdmin, router]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {isAdmin && !hideNavbar && <DashButton />}
      {!hideNavbar && <Footer />}
    </>
  )
}

"use client"

import { usePathname } from 'next/navigation'
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import DashButton from '@/components/common/DashButton';
import { useAuthStore } from '@/libs/auth';

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const hideNavbar = pathname === '/admin-panel'
  const {isAdmin}=useAuthStore();

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {isAdmin && <DashButton />}
      {!hideNavbar && <Footer />}
    </>
  )
}

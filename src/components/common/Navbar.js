"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from '../../assets/yeccu.jpg'
import Image from "next/image";
import { useAuthStore } from "@/libs/auth";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { token, user } = useAuthStore();
  const [basketballName, setBasketballName] = useState("");
  const router=usePathname();
  // Basketball-related random names
  const basketballNames = [
    "The Alley Oop",
    "The Slam Dunker",
    "The Crossover King",
    "The Ball Hawk",
    "The Three-Point Threat",
    "The Assist Master",
    "The Defense Anchor",
    "The Buzzer Beater",
    "The Fast Break",
    "The Rebound Artist",
    "The Pick & Roll",
    "The Fadeaway",
    "The Lockdown",
    "The Glass Cleaner",
    "The Stepback",
    "The Poster",
    "The Swish",
    "The Fast Breaker",
    "The Block Master",
    "The Steal Artist"
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (token && !basketballName) {
      const randomName = basketballNames[Math.floor(Math.random() * basketballNames.length)];
      setBasketballName(randomName);
    }
  }, [token, basketballName]);

  const normalize = (p) => (p === "/" ? "/" : p.replace(/\/$/, ""));

  const isActive = (href) => {
    if (!pathname) return false;
    const np = normalize(pathname);
    const nh = normalize(href);
    if (nh === "/") return np === "/";
    return np === nh || np.startsWith(nh + "/");
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleLGbutton=()=>{
    setShowBtn(!showBtn);
  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    window.location.href = '/';
  }

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-yellow-900/50">
      <div className="mx-auto  px-4 sm:px-6  ">
        <nav className="flex h-16  w-full  items-center justify-between gap-4">

          <div className="flex items-center">
            <Link href="/" className={`flex items-center transition-transform duration-200 ${isActive('/') ? '' : ''}`}>
              <Image src={Logo} alt="Yeccu Baskets Logo" width={50} height={50} className="h-auto object-contain" />
            </Link>
          </div>

          <ul className="hidden md:flex ml-30 select-none justify-center items-center gap-6 text-sm font-semibold uppercase tracking-wide">
            {[{ href: '/', label: 'Home' }, { href: '/products', label: 'Products' }, { href: '/blogs', label: 'Blog' }, { href: '/contact', label: 'Contact' }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative px-2 py-1 transition-all duration-200 hover:text-yellow-400 ${isActive(item.href) ? 'text-yellow-400' : 'text-white'}`}
                >
                  {item.label}
                  <span
                    className={`absolute left-1/2 -bottom-1 h-0.5 w-1/2 -translate-x-1/2 rounded bg-yellow-400 transition-opacity duration-200 ${isActive(item.href) ? 'opacity-100' : 'opacity-0'}`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-4">
            {mounted && token ? (
              <div className="relative">
                <div onClick={toggleLGbutton} className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md bg-yellow-400/10 border border-yellow-400/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-white select-none uppercase font-semibold text-sm">{user}</span>
              </div>
              <div
                onClick={() => handleLogout()}
                className={`absolute left-1/2 -translate-x-1/2 mt-2 px-4 py-1 rounded font-bold text-sm bg-yellow-400 text-black shadow-lg transition-all duration-200 ease-out transform ${showBtn ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
              >
                Logout
              </div>
                </div>
            ) : mounted ? (
              <Link
                href="/login"
                aria-label="Login"
                className={`hidden md:flex items-center text-white transition-colors duration-200 hover:text-yellow-400 ${isActive('/login') ? 'text-yellow-400' : ''}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            ) : null}

            <button
              type="button"
              onClick={toggleMenu}
              className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-md border border-yellow-900/50 text-white md:hidden transition-colors duration-200 hover:border-yellow-500"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-200 ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[35%] -translate-y-1/2'}`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-200 ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[65%] -translate-y-1/2'}`}
                />
              </span>
            </button>
          </div>
        </nav>

        <div
          className={`md:hidden absolute top-13 bottom-0 left-0 right-0 w-full transition-all duration-200 ${isOpen ? 'pointer-events-auto opacity-100 max-h-96' : 'pointer-events-none opacity-0 max-h-0'}`}
        >
          <div className="mt-2 border border-yellow-900/50 border-t-0 bg-black/95 px-4 py-4 shadow-lg">
            <ul className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide text-white">
              {[{ href: '/', label: 'Home' }, { href: '/products', label: 'Products' }, { href: '/blogs', label: 'Blog' }, { href: '/contact', label: 'Contact' }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-md px-2 py-2 transition-colors duration-150 hover:bg-white/5 ${isActive(item.href) ? 'text-yellow-400' : 'text-white'}`}
                  >
                    {item.label}
                    {isActive(item.href) && <span className="h-1 w-1 rounded-full bg-yellow-400" />}
                  </Link>
                </li>
              ))}
              {token ? (
                <li>
                  <div onClick={()=>handleLogout()} className="flex items-center gap-2 rounded-md px-2 py-2 bg-yellow-400/10 border border-yellow-400/30">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-yellow-400/50 bg-black/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-400"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <span className="text-white  font-semibold text-sm">{user}</span>
                  </div>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 rounded-md px-2 py-2 transition-colors duration-150 hover:bg-white/5 ${isActive('/login') ? 'text-yellow-400' : 'text-white'}`}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-yellow-900/50 bg-black/60">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
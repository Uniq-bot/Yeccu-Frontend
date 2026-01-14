"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import Logo from '../../assets/yeccu.jpg'
import Image from "next/image";
const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const normalize = (p) => (p === "/" ? "/" : p.replace(/\/$/, ""));

  const isActive = (href) => {
    if (!pathname) return false;
    const np = normalize(pathname);
    const nh = normalize(href);
    if (nh === "/") return np === "/";
    return np === nh || np.startsWith(nh + "/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="container">
        <nav>

          <div className="logo">
            <Link href="/" className={isActive('/') ? 'active' : ''}>
              <Image src={Logo} alt="Yeccu Baskets Logo" width={120} height={60} />
            </Link>
          </div>

          <ul className={isOpen ? "nav-link active" : "nav-link"}>
            <li>
              <Link href="/"  onClick={() => setIsOpen(false)} className={isActive('/') ? 'active' : ''}>HOME</Link>
            </li>
            <li>
              <Link href="/products" onClick={() => setIsOpen(false)} className={isActive('/products') ? 'active' : ''}>PRODUCTS</Link>
            </li>
            <li>
              <Link href="/blogs" onClick={() => setIsOpen(false)} className={isActive('/blogs') ? 'active' : ''}>BLOG</Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)} className={isActive('/contact') ? 'active' : ''}>CONTACT</Link>
            </li>
          </ul>

          <ul className="nav-user">
            <li>
              <Link href="/login" aria-label="Login" className={isActive('/login') ? 'active' : ''}>
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
            </li>

            <div className="Icon" onClick={toggleMenu}>
              <FaBars color="white" size={24} />
            </div>
          </ul>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;
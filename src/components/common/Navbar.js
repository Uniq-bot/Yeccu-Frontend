import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex gap-10'>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
    </div>
  )
}

export default Navbar
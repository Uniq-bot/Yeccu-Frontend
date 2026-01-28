
import Link from 'next/link'
import React from 'react'

const DashButton = () => {
  return (
    <Link  href="/admin-panel" className=" md:flex items-center gap-2 px-3 py-2 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-white select-none uppercase font-semibold text-sm">
        DashBoard
    </Link>
  )
}

export default DashButton
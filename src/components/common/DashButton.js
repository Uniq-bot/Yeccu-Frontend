
import Link from 'next/link'
import React from 'react'

const DashButton = () => {
  return (
    <Link  href="/admin-panel" className="fixed bottom-6 right-6 bg-yellow-400 text-black px-5 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-200 flex items-center gap-2 z-50">
        DashBoard
    </Link>
  )
}

export default DashButton
"use client"
import React, { useState } from 'react'

const PostSearch = () => {
    const [namePost, setNamePost] =useState("");
  return (
    <div>
        <input 
            type="text" 
            value={namePost}
            onChange={(e) => setNamePost(e.target.value)}
            placeholder="Search posts..."
            className="w-full p-2 border border-gray-300 rounded"
        />
    </div>
  )
}

export default PostSearch
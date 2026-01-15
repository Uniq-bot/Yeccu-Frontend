"use client"
import { Search } from 'lucide-react';
import React, { useState } from 'react'

const PostSearch = ({ allBlogs, setFilteredBlogs }) => {
    const [namePost, setNamePost] = useState("");
    const [isActive, setIsActive] = useState(false);
    
    const handleChange = (e) => {
        const value = e.target.value;
        setNamePost(value);
        
        if (value.trim() === '') {
            setFilteredBlogs(allBlogs);
        } else {
            const filtered = allBlogs.filter(blog => 
                blog.title.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBlogs(filtered);
        }
    }
    
  return (
    <div className={`w-full pl-6 py-2.5 flex items-center p-2 border ${isActive ? 'border-yellow-300' : 'border-yellow-500 '}  `}>
      <Search />
        <input 
            type="text" 
            value={namePost}
            onChange={handleChange}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder="Search posts..."
            className="pl-4 w-full bg-transparent outline-none border-none text-white placeholder-gray-400 ml-2"
        />
    </div>
  )
}

export default PostSearch
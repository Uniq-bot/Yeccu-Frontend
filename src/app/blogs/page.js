'use client'
import CategoryFilterBlogs from '@/components/Blog/CategoryFilterBlogs';
import Navbar from '@/components/common/Navbar';
import { useBlogStore } from '@/libs/useBlogStore';
import { Calendar } from 'lucide-react';
import React from 'react'
import { useState } from 'react';


const Blogs = () => {
  const {initializeBlogs}=useBlogStore();
  React.useEffect(()=>{
    initializeBlogs();
  },[initializeBlogs]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const Blogs = [
  {
    id: 1,
    title: "First Blog",
    description:
      "This blog introduces the basics of modern web development, covering essential tools, frameworks, and best practices that every beginner should understand before starting their journey.",
    date: "2023-01-01",
    category: "Tech",
  },
  {
    id: 2,
    title: "Understanding JavaScript",
    description:
      "JavaScript is the backbone of interactive web applications. This post explains core concepts like variables, functions, and events in a simple and beginner-friendly way.",
    date: "2023-02-10",
    category: "Programming",
  },
  {
    id: 3,
    title: "Getting Started with React",
    description:
      "React makes building user interfaces easier by using components. In this blog, we explore components, props, and state to help you build dynamic applications.",
    date: "2023-03-05",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Why Learn Next.js",
    description:
      "Next.js extends React with features like server-side rendering and routing. This article explains why Next.js is popular and how it improves performance and SEO.",
    date: "2023-04-18",
    category: "Web Development",
  },
  {
    id: 5,
    title: "Tips for Clean Code",
    description:
      "Writing clean code improves readability and maintainability. This blog shares practical tips such as meaningful naming, proper formatting, and avoiding unnecessary complexity.",
    date: "2023-05-22",
    category: "Best Practices",
  },
  {
    id: 6,
    title: "Introduction to Databases",
    description:
      "Databases store and manage application data efficiently. This post introduces basic database concepts, types of databases, and when to use SQL or NoSQL solutions.",
    date: "2023-06-30",
    category: "Backend",
  },
];

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold mb-8 ">YECCU<span className="text-amber-400"> BLOGS</span></h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Blogs.map((blog) => (
            
            <div key={blog.id} className="border-[0.5px] border-[#FFD700] p-0 hover:shadow-lg transition-shadow duration-300">
              <div className='relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden p-0'>
                <img src={`/blogimage${blog.id}.jpg`} alt={blog.title} className="w-full h-full object-cover mb-4 "  />
                <span className="absolute top-2 left-2 bg-[#FFD700] text-black text-[12px] font-thin px-2 py-0.5 ">
                  {blog.category}
                </span>
              </div>
              <div className="p-4">
                <span className="text-sm text-gray-500 flex items-center gap-1 mb-2"><Calendar size={15}/>{new Date(blog.date).toLocaleDateString()}</span>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 line-clamp-2 mb-4">{blog.description}</p>
                <button onClick={()=>setSelectedBlog(blog)} className="text-[#FFD700] font-semibold hover:underline">
                  Read More
                </button>


                
              </div>
            </div>
          ))}
        </div>
        {selectedBlog && (
          <div className="mt-10 fixed inset-0 bg-black bg-opacity-50 z-40">
            
            <div className="w-1/2 px-6 py-12 flex flex-col m-auto">
              <button className="w-full text-left text-sm text-gray-100 hover:underline-offset-1 hover:text-amber-300 cursor-pointer mb-6 " onClick={() => setSelectedBlog(null)}>← Back to Blogs</button>
              <img src={`/blogimage${selectedBlog.id}.jpg`} alt={selectedBlog.title} className="w-full h-100 object-cover  mb-4 border-2 border-amber-300 "  />
              <div className='w-full flex-col items-center'>
                <h2 className="w-full text-center text-3xl font-bold mb-4 text-white">{selectedBlog.title}</h2>
                <span className="text-sm text-gray-400 mb-2 flex items-center gap-1"><Calendar size={15}/>{new Date(selectedBlog.date).toLocaleDateString()}</span>
                <p className=" w-full text-justify text-gray-300 text-lg">{selectedBlog.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              </div>
          </div>

        )}  
      </main>
    </div>
  )
}

export default Blogs
'use client'
import CategoryFilterBlogs from '@/components/Blog/CategoryFilterBlogs';
import Navbar from '@/components/common/Navbar';
import { motion } from 'framer-motion';
import { useBlogStore } from '@/libs/useBlogStore';
import { Calendar } from 'lucide-react';
import React, { useEffect, useState } from 'react'


const Blogs = () => {
  const { blogs, filteredBlogs, blogCategories, currentBlogCategory, isLoading, isCategoryLoading, isFetchingBlog, initializeBlogs, initializeBlogCategories, filterBlogsByCategory, fetchCurrBlog, currBlog } = useBlogStore();
  const [currBlogState, setCurrBlog] = useState(null);
  useEffect(() => {
    initializeBlogs();
    initializeBlogCategories();
  }, [initializeBlogs, initializeBlogCategories]);

  const getDisplayDate = (dateString) => {
    if (!dateString) return 'Date unavailable';
    const date = new Date(dateString);
    return Number.isNaN(date.getTime())
      ? 'Date unavailable'
      : date.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getCategoryLabel = (blog) => {
    if (!blog) return 'Blog';
    const inlineLabel = blog.category || blog.categoryTitle || blog.categoryName;
    if (inlineLabel) return inlineLabel;
    const catId = blog.categoryId ?? blog.id;
    const match = blogCategories?.find((c) => (c?.categoryId ?? c?.id)?.toString() === (catId ?? '').toString());
    return match?.categoryTitle || match?.name || match?.categoryName || match?.title || 'Blog';
  };
  const handleFetchCurrBlog = async (id) => {
    const blog = await fetchCurrBlog(id);
    setCurrBlog(blog);
  };

  const visibleBlogs = filteredBlogs;

  return (
    <div>
      <main className={`max-w-7xl ${currBlogState? "hidden" : ""} overflow-y-auto min-h-300 mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-8 "
        >
          YECCU<span className="text-amber-400"> POSTS</span>
        </motion.h1>
        <div className="mb-8">
          <CategoryFilterBlogs
            categories={blogCategories}
            value={currentBlogCategory}
            loading={isCategoryLoading}
            onChange={(val) => {

              filterBlogsByCategory(val);
            }}
          />
        </div>
        {isLoading ? (
          <p className="text-gray-400">Loading blogs...</p>
        ) : visibleBlogs?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleBlogs.map((blog, index) => (
              <motion.div 
                key={blog.postId ?? blog.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="border-[0.5px] border-[#FFD700] p-0 shadow-lg"
              >
                <div className='relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden p-0'>
                  <img src={blog.imageName || `/blogimage${blog.postId ?? blog.id}.jpg`} alt={blog.title} className="w-full h-full object-cover mb-4 " />
                  <span className="absolute top-2 left-2 bg-[#FFD700] font-semibold text-black text-[12px] px-2 py-0.5 ">
                    {getCategoryLabel(blog)}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-sm text-gray-500 flex items-center gap-1 mb-2"><Calendar size={15} />{getDisplayDate(blog.creationDate || blog.date)}</span>
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 line-clamp-2 mb-4">{blog.description || blog.content}</p>
                  <button onClick={() => handleFetchCurrBlog(blog.postId ?? blog.id)} className="text-[#FFD700] font-semibold hover:underline">
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No blogs found for this category.</p>
        )}
        

      </main>
      {isFetchingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-400"></div>
            <p className="text-white text-lg">Loading blog...</p>
          </div>
        </div>
      )}
      {currBlogState && (
          <div className="mt-10 overflow-y-auto fixed inset-0 bg-black bg-opacity-50 z-40">
            <div className="w-1/2 px-6 py-12 flex flex-col m-auto">
              <button className="w-full text-left text-sm text-gray-100 hover:underline-offset-1 hover:text-amber-300 cursor-pointer mb-6 " onClick={() => setCurrBlog(null)}>← Back to Blogs</button>
              <img src={currBlogState.imageName || `/blogimage${currBlogState.postId ?? currBlogState.id}.jpg`} alt={currBlogState.title} className="w-full h-100 object-cover  mb-4 border-2 border-amber-300 " />
              <div className='w-full flex-col items-center'>
                <h2 className="w-full text-center text-3xl font-bold mb-4 text-white">{currBlogState.title}</h2>
                <span className="text-sm text-gray-400 mb-2 flex items-center gap-1"><Calendar size={15} />{getDisplayDate(currBlogState.creationDate || currBlogState.date)}</span>
                <p className=" w-full text-justify text-gray-300 text-lg">{currBlogState.description || currBlogState.content}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Blogs
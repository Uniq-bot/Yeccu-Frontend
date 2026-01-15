import PostSearch from '@/components/common/PostSearch'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import PostsTable from './PostsTable'
import PostForm from '../form/PostForm'

const PostsAdmin = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [allBlogs, setAllBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      category: "Technology",
      date: "2024-01-15",
      views: 1234
    },
    {
      id: 2,
      title: "Web Design Best Practices",
      category: "Design",
      date: "2024-01-10",
      views: 856
    },
    {
      id: 3,
      title: "Advanced JavaScript Tips",
      category: "Technology",
      date: "2024-01-08",
      views: 2105
    },
    {
      id: 4,
      title: "UI/UX Trends 2024",
      category: "Design",
      date: "2024-01-05",
      views: 1567
    },
    {
      id: 5,
      title: "SEO Optimization Guide",
      category: "Marketing",
      date: "2024-01-01",
      views: 3421
    }
  ]);
  const [filteredBlogs, setFilteredBlogs] = useState(allBlogs);

  const handleAddBlog = (newBlog) => {
    const blog = {
      id: Math.max(...allBlogs.map(b => b.id), 0) + 1,
      ...newBlog,
      views: 0
    };
    const updatedBlogs = [...allBlogs, blog];
    setAllBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
    setShowAddPost(false);
  };

  const handleDeleteBlog = (id) => {
    const updatedBlogs = allBlogs.filter(blog => blog.id !== id);
    setAllBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
  };

  const handleUpdateBlog = (updatedBlog) => {
    const updatedBlogs = allBlogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
    setAllBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
  };

  return (
    <div className='w-full min-h-150 border border-yellow-600'>
        <div className='flex justify-between items-center w-full px-5 py-4'>
          <div className='flex flex-col leading-1.5'>
            <h2 className='text-white font-extrabold text-2xl'>
              POSTS
            </h2>
            <p className='text-[13px]'>
              Manage your blog posts
            </p>
          </div>
          <button onClick={() => setShowAddPost(true)} className='flex items-center  text-black font-bold px-5 py-2 bg-yellow-400'>
            <Plus /> Add Post
          </button>
        </div>
        <div className='px-10 py-5'>
          <PostSearch allBlogs={allBlogs} setFilteredBlogs={setFilteredBlogs} />
        </div>
        <div>
          <PostsTable blogs={filteredBlogs} onDelete={handleDeleteBlog} onUpdate={handleUpdateBlog} />
        </div>
        {showAddPost && <PostForm onClose={() => setShowAddPost(false)} onAdd={handleAddBlog} />}
    </div>
  )
}

export default PostsAdmin
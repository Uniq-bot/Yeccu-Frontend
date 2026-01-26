import PostSearch from '@/components/common/PostSearch'
import { Plus } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import PostsTable from './PostsTable'
import PostForm from '../form/PostForm'
import { useBlogStore } from '@/libs/useBlogStore'
import { useAdminStore } from '@/libs/useAdminStore'

const PostsAdmin = ({ initialShowForm = false }) => {
  const [showAddPost, setShowAddPost] = useState(initialShowForm);
  const { setShowPostForm } = useAdminStore();
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { initializeBlogs, blogs, blogCategories, deletePost } = useBlogStore();

  useEffect(() => {
    if (initialShowForm) {
      setShowAddPost(true);
      setShowPostForm(false); // Reset the flag after opening
    }
  }, [initialShowForm, setShowPostForm]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        await initializeBlogs();
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [initializeBlogs]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setAllBlogs(blogs);
      setFilteredBlogs(blogs);
    }
  }, [blogs]);

  const handleAddBlog = (newBlog) => {
    // Refetch blogs after adding a new one
    const fetchBlogs = async () => {
      try {
        await initializeBlogs();
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
    setShowAddPost(false);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deletePost(id);
      const updatedBlogs = allBlogs.filter(blog => blog.postId !== id);
      setAllBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error("Error deleting post:", error);
      alert('Failed to delete post: ' + error.message);
    }
  };

  const handleUpdateBlog = (updatedBlog) => {
    const updatedBlogs = allBlogs.map(blog => blog.postId === updatedBlog.postId ? updatedBlog : blog);
    setAllBlogs(updatedBlogs);
    setFilteredBlogs(updatedBlogs);
  };

  if (isLoading) {
    return (
      <div className='w-full min-h-150 border border-yellow-600 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <span className='h-8 w-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></span>
          <p className='text-yellow-400'>Loading posts...</p>
        </div>
      </div>
    );
  }

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
          <PostsTable blogs={filteredBlogs} blogCategories={blogCategories} onDelete={handleDeleteBlog} onUpdate={handleUpdateBlog} />
        </div>
        {showAddPost && <PostForm onClose={() => setShowAddPost(false)} onAdd={handleAddBlog} />}
    </div>
  )
}

export default PostsAdmin
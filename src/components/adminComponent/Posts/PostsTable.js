import React, { useState } from 'react'
import { motion } from 'framer-motion'
// import EditBlog from './EditBlog/EditBlog';
import { Edit, Trash } from 'lucide-react';
const PostsTable = ({ blogs, blogCategories = [], onDelete, onUpdate }) => {
  const [deletingPostId, setDeletingPostId] = useState(null);

  const getCategoryTitle = (categoryId) => {
    const category = blogCategories.find(cat => cat._id === categoryId || cat.categoryId === categoryId);
    return category?.categoryTitle || 'Unknown';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);


  // const handleDelete = (postId) => {
  //   console.log("Delete blog with id:", postId);
  //   onDelete(postId);
  // }
  
  const handleDeleteWithLoader = async (postId) => {
    setDeletingPostId(postId);
    try {
      await onDelete(postId);
    } finally {
      setDeletingPostId(null);
    }
  };
  
  // const handleEdit = (postId) => {
  //   const blog = blogs.find(b => b.postId === postId);
  //   setSelectedBlog(blog);
  //   setIsEditOpen(true);
  //   console.log("Edit blog with id:", postId);
  // }

  // const handleCloseEdit = () => {
  //   setIsEditOpen(false);
  //   setSelectedBlog(null);
  // }

  // const handleSaveEdit = (updatedBlog) => {
  //   onUpdate(updatedBlog);
  //   handleCloseEdit();
  // }

  return (
    <>
      {/* Edit feature disabled */}
      {/* {isEditOpen && selectedBlog && (
        <EditBlog blog={selectedBlog} onClose={handleCloseEdit} onSave={handleSaveEdit} />
      )} */}
      <div className="w-full overflow-x-auto px-5">
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
            <p className="text-lg">No posts found</p>
            <p className="text-sm mt-2">Create your first post to get started</p>
          </div>
        ) : (
          <table className="w-full border-collapse ">
            <thead>
              <tr className=" border-b border-yellow-700 ">
                <th className="px-6 py-3  text-white text-center font-semibold">Title</th>
                <th className="px-6 py-3  text-white text-center font-semibold">Category</th>
                <th className="px-6 py-3  text-white text-center font-semibold">Date</th>
                <th className="px-6 py-3  text-white text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <motion.tr 
                  key={blog.postId} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-900"
                >
                  <td className="px-6 py-4 text-white text-center">{blog.title}</td>
                  <td className="px-6 py-4 text-white text-center">{getCategoryTitle(blog.categoryId)}</td>
                  <td className="px-6 py-4 text-white text-center">{formatDate(blog.creationDate)}</td>
                  <td className="px-6 py-4 text-white text-center flex gap-2 justify-center">
                    {/* Edit button disabled */}
                    {/* <button onClick={() => handleEdit(blog.postId)} className="px-1 py-1 bg-yellow-600 hover:bg-yellow-700 text-white  text-[5px]"><Edit size={20} /></button> */}
                    <button 
                      onClick={() => handleDeleteWithLoader(blog.postId)} 
                      disabled={deletingPostId === blog.postId}
                      className="px-1 py-1 bg-red-600 hover:bg-red-700 text-white text-[5px] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                    >
                      {deletingPostId === blog.postId ? (
                        <span className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                      ) : (
                        <Trash size={20} />
                      )}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default PostsTable
import React, { useState } from 'react'
import EditBlog from './EditBlog/EditBlog';
import { Edit, Trash } from 'lucide-react';
const PostsTable = ({ blogs, onDelete, onUpdate }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);


  const handleDelete = (id) => {
    console.log("Delete blog with id:", id);
    onDelete(id);
  }
  
  const handleEdit = (id) => {
    const blog = blogs.find(b => b.id === id);
    setSelectedBlog(blog);
    setIsEditOpen(true);
    console.log("Edit blog with id:", id);
  }

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedBlog(null);
  }

  const handleSaveEdit = (updatedBlog) => {
    onUpdate(updatedBlog);
    handleCloseEdit();
  }

  return (
    <>
      {isEditOpen && selectedBlog && (
        <EditBlog blog={selectedBlog} onClose={handleCloseEdit} onSave={handleSaveEdit} />
      )}
      <div className="w-full overflow-x-auto px-5">
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
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="px-6 py-4 text-white text-center">{blog.title}</td>
                <td className="px-6 py-4 text-white text-center">{blog.category}</td>
                <td className="px-6 py-4 text-white text-center">{blog.date}</td>
                <td className="px-6 py-4 text-white text-center flex gap-2 justify-center">
                  <button onClick={() => handleEdit(blog.id)} className="px-1 py-1 bg-yellow-600 hover:bg-yellow-700 text-white  text-[5px]"><Edit size={20} /></button>
                  <button onClick={() => handleDelete(blog.id)} className="px-1 py-1 bg-red-600 hover:bg-red-700 text-white  text-[5px]"><Trash size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PostsTable
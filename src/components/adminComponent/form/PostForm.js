'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'

const PostForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.category && formData.date) {
      onAdd(formData);
      setFormData({ title: '', category: '', date: '' });
    } else {
      alert('Please fill in all fields');
    }
  };
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="w-full max-w-md border-2 border-yellow-400 bg-[#0a0a0a] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-yellow-400 px-4 py-3">
          <h2 className="text-lg font-bold text-black uppercase tracking-tight">Add Post</h2>
          <button onClick={onClose} className="text-black hover:opacity-70 transition-opacity">
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Post Title */}
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase mb-2 tracking-wider">
              Post Title
            </label>
            <input 
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-800 p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="Enter post title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase mb-2 tracking-wider">
              Category
            </label>
            <input 
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-800 p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
              placeholder="Enter category"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase mb-2 tracking-wider">
              Date
            </label>
            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-800 p-3 text-white color-scheme-dark focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 border border-zinc-700 py-3 text-sm font-bold text-zinc-400 uppercase hover:bg-zinc-900 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-yellow-400 py-3 text-sm font-bold text-black uppercase hover:bg-yellow-500 transition-all"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostForm
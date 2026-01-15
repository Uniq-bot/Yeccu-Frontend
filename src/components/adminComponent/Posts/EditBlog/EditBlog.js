'use client'
import React, { useState } from 'react'

const EditBlog = ({ blog, onClose, onSave }) => {
  const [formData, setFormData] = useState(blog)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Modal */}
      <div className="w-[380px] border-2 border-yellow-400 bg-[#111] text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-yellow-400 px-4 py-3 text-black font-bold">
          <span>EDIT POST</span>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm text-yellow-400 mb-1">
              POST TITLE
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-black border border-yellow-400 px-3 py-2 outline-none text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-400 mb-1">
              CATEGORY
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-black border border-yellow-400 px-3 py-2 outline-none text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-400 mb-1">
              DATE
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-black border border-yellow-400 px-3 py-2 outline-none text-white"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-500 py-2 text-gray-300 hover:bg-gray-800"
            >
              CANCEL
            </button>
            <button type="submit" className="flex-1 bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-500">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog
'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import CategorySelector from '../Categories/categorySelector/CategorySelector';
import { useProductStore } from '@/libs/useProductStore';

const ProductForm = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createProduct } = useProductStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.productName.trim()) {
      setError('Please enter a product name');
      return;
    }

    if (!formData.description.trim()) {
      setError('Please enter a description');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    if (!formData.image) {
      setError('Please select an image');
      return;
    }

    setIsSubmitting(true);
    try {
      const productData = {
        productName: formData.productName.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        categoryId: formData.category,
        image: formData.image
      };

      await createProduct(productData);
      
      setFormData({ productName: '', description: '', price: '', category: '', image: null });
      onAdd && onAdd(productData);
      onClose();
      alert('Product created successfully!');
    } catch (err) {
      setError(err.message || 'Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <motion.div 
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     transition={{ duration: 0.2 }}
     className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
   >
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md border-2 border-yellow-400 bg-[#0a0a0a] shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between bg-yellow-400 px-4 py-3 sticky top-0">
          <h2 className="text-base sm:text-lg font-bold text-black uppercase tracking-tight">Add Product</h2>
          <button onClick={onClose} className="text-black hover:opacity-70 transition-opacity" disabled={isSubmitting}>
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
          {/* Error Message */}
          {error && (
            <div className='p-3 bg-red-900/30 border border-red-500 rounded text-red-400 text-sm'>
              {error}
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase mb-2 tracking-wider">
              Product Name
            </label>
            <input 
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-black border border-zinc-800 p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50"
              placeholder="Enter product title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase mb-2 tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-black border border-zinc-800 p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50 min-h-24"
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase mb-2 tracking-wider">
              Price
            </label>
            <input 
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={isSubmitting}
              step="0.01"
              min="0"
              className="w-full bg-black border border-zinc-800 p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50"
              placeholder="Enter product price"
            />
          </div>

          {/* Category */}
          <div>
            <CategorySelector 
              value={formData.category}
              onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              type="product"
              label="Product Category"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-xs font-bold text-yellow-400 uppercase mb-2 tracking-wider">
              Image
            </label>
            <input 
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              disabled={isSubmitting}
              className="w-full bg-black border border-zinc-800 p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-50 file:bg-yellow-400 file:text-black file:border-0 file:px-3 file:py-1 file:rounded file:cursor-pointer file:font-bold"
            />
            {formData.image && (
              <p className="text-xs text-zinc-400 mt-2">Selected: {formData.image.name}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 border border-zinc-700 py-3 text-sm font-bold text-zinc-400 uppercase hover:bg-zinc-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-yellow-400 py-3 text-sm font-bold text-black uppercase hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className='animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent'></span>
                  Creating...
                </>
              ) : (
                'Add'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ProductForm

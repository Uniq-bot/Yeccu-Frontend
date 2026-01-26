import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import useCreateCate from '@/libs/createCate';

const CategoryForm = ({close}) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { createCategory, isCreatingCate } = useCreateCate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!categoryName.trim()) {
    setError('Please enter a category name');
    return;
  }

  if (!categoryType) {
    setError('Please select a type');
    return;
  }

  setIsSubmitting(true);
  try {
    const categoryData = {
      categoryTitle: categoryName.trim(),
      type: categoryType // already BLOG / PRODUCT
    };

    await createCategory(categoryData);

    setCategoryName('');
    setCategoryType('');
    close(false);
    alert('Category created successfully!');
  } catch (error) {
    setError(error.message || 'Failed to create category');
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
      className='w-full h-full bg-black/30 bg-opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
        className='w-full max-w-md bg-neutral-900 border-4 border-yellow-400'
      >
        {/* Header */}
        <div className='bg-yellow-400 px-6 py-4 flex items-center justify-between'>
          <h2 className='text-black text-xl font-bold'>ADD CATEGORY</h2>
          <button onClick={()=> close(false)} className='text-black hover:text-neutral-700 transition-colors'>
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className='p-6'>
          {/* Category Name */}
          <div className='mb-6'>
            <label className='text-yellow-400 text-sm font-bold mb-2 block'>
              CATEGORY NAME
            </label>
            <input
              type='text'
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className='w-full bg-black border border-yellow-400 text-white px-4 py-3 focus:outline-none focus:border-yellow-300'
              placeholder='Enter category name'
              disabled={isCreatingCate || isSubmitting}
            />
          </div>

          {/* Type */}
          <div className='mb-6'>
            <label className='text-yellow-400 text-sm font-bold mb-2 block'>
              TYPE
            </label>
            <select
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              className='w-full bg-black border border-yellow-400 text-white px-4 py-3 focus:outline-none focus:border-yellow-300'
              disabled={isCreatingCate || isSubmitting}
            >
              <option value=''>Select Type</option>
              <option value='product'>Product</option>
              <option value='blog'>Blog</option>
            </select>
          </div>

      

          {/* Error Message */}
          {error && (
            <div className='mb-6 p-3 bg-red-900/30 border border-red-500 rounded text-red-400 text-sm'>
              {error}
            </div>
          )}
          {/* Buttons */}
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => close(false)}
              className='flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white font-bold py-3 transition-colors disabled:opacity-50'
              disabled={isCreatingCate || isSubmitting}
            >
              CANCEL
            </button>
            <button
              type='submit'
              className='flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              disabled={isCreatingCate || isSubmitting}
            >
              {isCreatingCate || isSubmitting ? (
                <>
                  <span className='animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent'></span>
                  CREATING...
                </>
              ) : (
                'ADD'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CategoryForm;
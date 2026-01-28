"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import CategoryForm from '../form/CategoryForm';
import useCreateCate from '@/libs/createCate';
import { useAdminStore } from '@/libs/useAdminStore';
import { useToast } from '@/libs/useToast';

const CategoriesAdmin = ({ initialShowForm = false }) => {
  
  const [displayCateForm, setDisplayCateForm] = useState(initialShowForm);
  const { setShowCategoryForm } = useAdminStore();
  const {
    getAllCategory,
    deleteCategory,
    isLoadingCategories,
    deletingCategoryId,
  } = useCreateCate();
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (initialShowForm) {
      setDisplayCateForm(true);
      setShowCategoryForm(false); // Reset the flag after opening
    }
  }, [initialShowForm, setShowCategoryForm]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getAllCategory();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      showToast("Failed to load categories", "error");
    }
  }, [getAllCategory, showToast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      await fetchCategories();
      showToast("Category deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting category:", error.message);
      showToast("Failed to delete category", "error");
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-900 p-8">
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full px-3 sm:px-5 py-4 gap-4'>
               <div className='flex flex-col leading-1.5'>
                 <h2 className='text-white font-extrabold text-xl sm:text-2xl'>
                   Add categories
                 </h2>
                 <p className='text-[13px] text-gray-400'>
                   Manage your categories
                 </p>
               </div>
               <motion.button 
                 whileHover={{ scale: 1.03 }}
                 whileTap={{ scale: 0.97 }}
                 onClick={() => setDisplayCateForm(true)} 
                 className='flex items-center text-black font-bold px-4 sm:px-5 py-2 bg-yellow-400 text-sm sm:text-base whitespace-nowrap'
               >
                 <Plus size={18} className='mr-2' /> Add Category
               </motion.button>
               </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoadingCategories && (
          <div className="col-span-full flex items-center justify-center py-12 text-yellow-400 gap-3">
            <span className="h-5 w-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
            <span>Loading categories...</span>
          </div>
        )}

        {!isLoadingCategories && categories.length === 0 && (
          <div className="col-span-full text-center text-neutral-400 py-12">
            No categories found.
          </div>
        )}

        {!isLoadingCategories && categories.map((category, index) => (
          <motion.div
            key={category.categoryId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}
            whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
            className="bg-black border border-neutral-800 p-6 hover:border-yellow-400 transition-colors"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <Folder className="text-yellow-400" size={32} />
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(category.categoryId)}
                  className="bg-neutral-800 hover:bg-red-600 text-red-600 hover:text-white p-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={deletingCategoryId === category.categoryId}
                >
                  {deletingCategoryId === category.categoryId ? (
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Category Info */}
            <h3 className="text-white text-xl font-bold mb-2">{category.categoryTitle}</h3>
            <p className="text-neutral-400 text-sm mb-2">{category.type}</p>

          </motion.div>
        ))}
      </div>
      {
        displayCateForm && (
          <CategoryForm close={setDisplayCateForm} />
        )
      }
    </div>
  );
};

export default CategoriesAdmin;
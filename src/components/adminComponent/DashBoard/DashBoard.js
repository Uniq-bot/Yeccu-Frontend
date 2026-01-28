'use client'
import React, { useEffect, useState } from 'react';
import { Package, BarChart3, DollarSign, Eye, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProductStore } from '@/libs/useProductStore';
import { useBlogStore } from '@/libs/useBlogStore';
import { useAdminStore } from '@/libs/useAdminStore';

const DashBoard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { products, initializeProducts } = useProductStore();
  const { blogs, initializeBlogs } = useBlogStore();
  const { setCurrComp, setShowCategoryForm, setShowProductForm, setShowPostForm } = useAdminStore();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          initializeProducts(),
          initializeBlogs()
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initializeProducts, initializeBlogs]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      setProductsCount(products.length);
    }
  }, [products]);

  useEffect(() => {
    if (blogs && Array.isArray(blogs)) {
      setPostsCount(blogs.length);
    }
  }, [blogs]);

  const stats = [
    {
      title: 'TOTAL PRODUCTS',
      value: isLoading ? '...' : productsCount.toString(),
      icon: Package,
      bgColor: 'bg-yellow-400',
      textColor: 'text-black',
      iconOpacity: 'opacity-20'
    },
    {
      title: 'TOTAL POSTS',
      value: isLoading ? '...' : postsCount.toString(),
      icon: BarChart3,
      bgColor: 'bg-neutral-900',
      textColor: 'text-white',
      borderColor: 'border-yellow-400',
      iconOpacity: 'opacity-10'
    },
    {
      title: 'TOTAL SALES',
      value: '0',
      icon: DollarSign,
      bgColor: 'bg-neutral-900',
      textColor: 'text-white',
      borderColor: 'border-yellow-400',
      iconOpacity: 'opacity-10'
    },
    {
      title: 'TOTAL VIEWS',
      value: '0',
      icon: Eye,
      bgColor: 'bg-neutral-900',
      textColor: 'text-white',
      borderColor: 'border-yellow-400',
      iconOpacity: 'opacity-10'
    }
  ];

  const handleQuickAction = (action) => {
    // Reset all form flags
    setShowCategoryForm(false);
    setShowProductForm(false);
    setShowPostForm(false);
    
    // Set the appropriate flag based on action
    if (action === 'categories') {
      setShowCategoryForm(true);
    } else if (action === 'products') {
      setShowProductForm(true);
    } else if (action === 'posts') {
      setShowPostForm(true);
    }
    
    setCurrComp(action);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black p-4 sm:p-6 min-h-screen"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
            className={`${stat.bgColor} ${stat.borderColor ? `border-2 ${stat.borderColor}` : ''} p-4 sm:p-6 relative overflow-hidden cursor-pointer`}
          >
            {/* Background Icon */}
            <stat.icon
              className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 ${stat.iconOpacity} ${stat.textColor}`}
              size={80}
              strokeWidth={1.5}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <p className={`${stat.textColor} text-xs font-bold mb-2 opacity-80`}>
                {stat.title}
              </p>
              <p className={`${stat.textColor} text-3xl sm:text-4xl font-bold`}>
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-2 border-yellow-400 bg-neutral-900 p-4 sm:p-6"
      >
        <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          QUICK <span className="text-yellow-400">ACTIONS</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleQuickAction('products')}
            className="bg-transparent hover:text-black cursor-pointer hover:bg-yellow-400 hover:bg-opacity-10 border-2 border-yellow-400 text-yellow-400 font-bold py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 transition-colors text-sm sm:text-base"
          >
            <Plus size={20} strokeWidth={3} />
            ADD PRODUCT
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleQuickAction('posts')}
            className="bg-transparent hover:text-black cursor-pointer hover:bg-yellow-400 hover:bg-opacity-10 border-2 border-yellow-400 text-yellow-400 font-bold py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 transition-colors text-sm sm:text-base"
          >
            <Plus size={20} strokeWidth={3} />
            ADD POST
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleQuickAction('categories')}
            className="bg-transparent hover:text-black cursor-pointer hover:bg-yellow-400 hover:bg-opacity-10 border-2 border-yellow-400 text-yellow-400 font-bold py-3 sm:py-4 px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 transition-colors text-sm sm:text-base sm:col-span-2 lg:col-span-1"
          >
            <Plus size={20} strokeWidth={3} />
            ADD CATEGORY
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashBoard;
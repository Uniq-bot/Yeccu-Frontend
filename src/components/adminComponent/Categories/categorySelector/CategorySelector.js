import useCreateCate from '@/libs/createCate'
import { useBlogStore } from '@/libs/useBlogStore'
import { useProductStore } from '@/libs/useProductStore'
import React, { useEffect } from 'react'

const CategorySelector = ({ value, onChange, disabled = false, label = "Select Category", type = 'blog' }) => {
    const { allCategories, getAllCategory, isLoadingCategories } = useCreateCate()
    const { blogCategories, initializeBlogCategories, isCategoryLoading } = useBlogStore()
    const { categories: productCategories, initializeProducts, isLoading: isProductLoading } = useProductStore()

    useEffect(() => {
        if (type === 'blog') {
            const fetchBlogCategories = async () => {
                try {
                    await initializeBlogCategories()
                } catch (error) {
                    console.error("Error fetching blog categories:", error)
                }
            }
            fetchBlogCategories()
        } else if (type === 'product') {
            const fetchProductCategories = async () => {
                try {
                    await initializeProducts()
                } catch (error) {
                    console.error("Error fetching product categories:", error)
                }
            }
            fetchProductCategories()
        }
    }, [type, getAllCategory, initializeBlogCategories, initializeProducts])

    const categories = type === 'blog' ? blogCategories : (type === 'product' ? productCategories : allCategories)
    const isLoading = type === 'blog' ? isCategoryLoading : (type === 'product' ? isProductLoading : isLoadingCategories)

    return (
        <div className='mb-6'>
            <label className='text-yellow-400 text-sm font-bold mb-2 block'>
                {label}
            </label>
            <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                disabled={isLoading || disabled}
                className='w-full bg-black border border-yellow-400 text-white px-4 py-3 focus:outline-none focus:border-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed'
            >
                <option value=''>Select Category</option>
                {isLoading ? (
                    <option disabled>Loading categories...</option>
                ) : categories.length === 0 ? (
                    <option disabled>No categories available</option>
                ) : (
                    categories.map((category) => (
                        <option key={category._id || category.categoryId} value={category._id || category.categoryId}>
                            {category.categoryTitle}
                        </option>
                    ))
                )}
            </select>
        </div>
    )
}

export default CategorySelector
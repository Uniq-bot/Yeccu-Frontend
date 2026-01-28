'use client'
import React, { useState } from 'react'
import { useProductStore } from '@/libs/useProductStore'
import CategorySelector from '../../Categories/categorySelector/CategorySelector'
import { useToast } from '@/libs/useToast'

const EditProduct = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    productName: product.productName || '',
    price: product.price || '',
    categoryId: product.categoryId || '',
    image: null
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { updateProduct, uploadProductImage } = useProductStore()
  const { showToast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.productName.trim()) {
      setError('Please enter a product name')
      return
    }

    if (!formData.price || formData.price <= 0) {
      setError('Please enter a valid price')
      return
    }

    if (!formData.categoryId) {
      setError('Please select a category')
      return
    }

    setIsSubmitting(true)
    try {
      // Update product content first (JSON)
      const productData = {
        productName: formData.productName.trim(),
        price: parseFloat(formData.price),
        categoryId: formData.categoryId
      }
      
      console.log("Sending update for product:", product.id, productData);
      await updateProduct(product.id, productData)
      console.log("Product updated successfully");

      // Upload image separately if selected - with small delay to avoid race condition
      if (formData.image) {
        console.log("Waiting before image upload...");
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        console.log("Uploading image...");
        await uploadProductImage(product.id, formData.image)
        console.log("Image uploaded successfully");
      }

      onSave({
        ...product,
        productName: formData.productName.trim(),
        price: parseFloat(formData.price),
        categoryId: formData.categoryId
      })
      onClose()
      showToast('Product updated successfully!', 'success')
    } catch (err) {
      setError(err.message || 'Failed to update product')
      console.error('Error updating product:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Modal */}
      <div className="w-full max-w-md border-2 border-yellow-400 bg-[#0a0a0a] shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-yellow-400 px-4 py-3 sticky top-0">
          <span className="text-black font-bold">EDIT PRODUCT</span>
          <button onClick={onClose} className="text-black hover:opacity-70 transition-opacity" disabled={isSubmitting}>
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Error Message */}
          {error && (
            <div className='p-3 bg-red-900/30 border border-red-500 rounded text-red-400 text-sm'>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-yellow-400 mb-1 font-bold">
              PRODUCT NAME
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-black border border-yellow-400 px-3 py-2 outline-none text-white focus:border-yellow-300 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-400 mb-1 font-bold">
              PRICE
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={isSubmitting}
              step="0.01"
              min="0"
              className="w-full bg-black border border-yellow-400 px-3 py-2 outline-none text-white focus:border-yellow-300 disabled:opacity-50"
            />
          </div>

          <div>
            <CategorySelector
              value={formData.categoryId}
              onChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
              type="product"
              label="Category"
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-400 mb-1 font-bold">
              UPDATE IMAGE (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
              className="w-full bg-black border border-yellow-400 px-3 py-2 outline-none text-white focus:border-yellow-300 disabled:opacity-50 file:bg-yellow-400 file:text-black file:border-0 file:px-2 file:py-1 file:rounded file:cursor-pointer file:font-bold"
            />
            {formData.image && (
              <p className="text-xs text-zinc-400 mt-2">Selected: {formData.image.name}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 border border-gray-500 py-2 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              CANCEL
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className='animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent'></span>
                  Saving...
                </>
              ) : (
                'SAVE'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct

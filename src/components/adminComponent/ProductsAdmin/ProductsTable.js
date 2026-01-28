'use client'
import React, { useState } from 'react'
import { Trash, Edit } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProductStore } from '@/libs/useProductStore'
import { useToast } from '@/libs/useToast'
import EditProduct from './EditProduct/EditProduct'

const ProductsTable = ({ products, onDeleteSuccess, productCategories }) => {
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { deleteProduct } = useProductStore();
  const { showToast } = useToast();

  const getCategoryTitle = (categoryId) => {
    const category = productCategories?.find(cat => cat._id === categoryId || cat.categoryId === categoryId);
    return category?.categoryTitle || 'Unknown Category';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDeleteWithLoader = async (productId) => {
    console.log("Attempting to delete product with ID:", productId);
    if (!productId) {
      showToast("Error: Product ID is undefined", "error");
      return;
    }
    
    setDeletingProductId(productId);
    try {
      await deleteProduct(productId);
      onDeleteSuccess(productId);
    } catch (err) {
      console.error("Error deleting product:", err);
      showToast("Failed to delete product: " + err.message, "error");
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleEdit = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setIsEditOpen(true);
    console.log("Edit product with id:", productId);
  }

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  }

  const handleSaveEdit = (updatedProduct) => {
    setIsEditOpen(false);
    // Optionally refresh products after save
    // You could call a refetch function here if available
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">No Products</h3>
          <p className="text-zinc-400">Create your first product to get started</p>
        </div>
      </div>
    );
  }

  if (products.length > 0) {
    console.log("Sample product structure:", products[0]);
  }

  return (
    <>
      {isEditOpen && selectedProduct && (
        <EditProduct product={selectedProduct} onClose={handleCloseEdit} onSave={handleSaveEdit} />
      )}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-yellow-400 bg-black">
              <th className="text-left p-4 text-xs font-bold text-yellow-400 uppercase tracking-wider">Product Name</th>
              <th className="text-left p-4 text-xs font-bold text-yellow-400 uppercase tracking-wider">Category</th>
              <th className="text-left p-4 text-xs font-bold text-yellow-400 uppercase tracking-wider">Price</th>
              <th className="text-center p-4 text-xs font-bold text-yellow-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
                <td className="p-4 text-white text-sm">{product.productName || 'Untitled'}</td>
                <td className="p-4 text-zinc-400 text-sm">{getCategoryTitle(product.categoryId)}</td>
                <td className="p-4 text-zinc-400 text-sm">NRS. {product.price?.toFixed(2) || 'N/A'}</td>
                <td className="p-4 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="inline-flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded transition-all"
                      title="Edit product"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteWithLoader(product.id)}
                      disabled={deletingProductId !== null}
                      className="inline-flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 p-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete product"
                    >
                      {deletingProductId === product.id ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent"></span>
                        </>
                      ) : (
                        <Trash size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden px-5 pb-5 space-y-4">
        {products.map((product, index) => (
          <motion.div 
            key={product.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-black border border-zinc-800 rounded-lg p-4 space-y-3 hover:bg-zinc-900 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm">{product.productName || 'Untitled'}</h3>
                <p className="text-zinc-400 text-xs mt-1">{getCategoryTitle(product.categoryId)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="inline-flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded transition-all"
                  title="Edit product"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteWithLoader(product.id)}
                  disabled={deletingProductId !== null}
                  className="inline-flex items-center justify-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 p-2 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete product"
                >
                  {deletingProductId === product.id ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent"></span>
                  ) : (
                    <Trash size={16} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-zinc-700">
              <div>
                <p className="text-zinc-400 text-xs">Price</p>
                <p className="text-yellow-400 font-bold">NRS. {product.price?.toFixed(2) || 'N/A'}</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-400 text-xs">Date</p>
                <p className="text-white text-xs">{formatDate(product.createdDate || product.createdAt)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default ProductsTable

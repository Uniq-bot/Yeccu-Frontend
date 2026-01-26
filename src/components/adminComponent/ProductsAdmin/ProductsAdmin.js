import { Plus } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import ProductForm from '../form/ProductForm'
import ProductsTable from './ProductsTable'
import { useProductStore } from '@/libs/useProductStore'
import useCreateCate from '@/libs/createCate'
import { useAdminStore } from '@/libs/useAdminStore'

const ProductsAdmin = ({ initialShowForm = false }) => {
  const [showAddProduct, setShowAddProduct] = useState(initialShowForm);
  const { setShowProductForm } = useAdminStore();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productCategories, setProductCategories] = useState([]);

  const { products, initializeProducts } = useProductStore();
  const { allCategories, getAllCategory } = useCreateCate();

  useEffect(() => {
    if (initialShowForm) {
      setShowAddProduct(true);
      setShowProductForm(false); // Reset the flag after opening
    }
  }, [initialShowForm, setShowProductForm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await initializeProducts();
        await getAllCategory();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initializeProducts]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      setAllProducts(products);
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (allCategories && Array.isArray(allCategories)) {
      setProductCategories(allCategories);
    }
  }, [allCategories]);

  const handleAddProduct = () => {
    // Refetch products after adding
    const fetchData = async () => {
      try {
        await initializeProducts();
      } catch (error) {
        console.error('Error refetching products:', error);
      }
    };
    fetchData();
    setShowAddProduct(false);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const updatedProducts = allProducts.filter(product => product.id !== productId);
      setAllProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product: ' + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className='w-full min-h-150 border border-yellow-600 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <span className='h-8 w-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></span>
          <p className='text-yellow-400'>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-150 border border-yellow-600'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center w-full px-3 sm:px-5 py-4 gap-4'>
          <div className='flex flex-col leading-1.5'>
            <h2 className='text-white font-extrabold text-xl sm:text-2xl'>
              PRODUCTS
            </h2>
            <p className='text-[13px] text-gray-400'>
              Manage your products
            </p>
          </div>
          <button onClick={() => setShowAddProduct(true)} className='flex items-center text-black font-bold px-4 sm:px-5 py-2 bg-yellow-400 text-sm sm:text-base whitespace-nowrap'>
            <Plus size={18} className='mr-2' /> Add Product
          </button>
        </div>
        <div>
          <ProductsTable products={filteredProducts} productCategories={productCategories} onDeleteSuccess={handleDeleteProduct} />
        </div>
        {showAddProduct && <ProductForm onClose={() => setShowAddProduct(false)} onAdd={handleAddProduct} />}
    </div>
  )
}

export default ProductsAdmin
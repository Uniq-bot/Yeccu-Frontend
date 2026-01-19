"use client"

import React from 'react'
import { FaFilter, FaTimes } from 'react-icons/fa'
import { useProductStore } from '@/libs/useProductStore'
const MobileFilter = () => {
  const [showFilter, setShowFilter] = React.useState(false);
  const { categories, currentCategory, setCurrentCategory } = useProductStore();

  React.useEffect(() => {
    // lock body scroll when filter is open
    document.body.style.overflow = showFilter ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFilter]);

  const open = () => setShowFilter(true);
  const close = () => setShowFilter(false);

  const handleCategory = (category) => {
    const categoryId = category === "All" ? "All" : category.categoryId;
    setCurrentCategory(categoryId);
    close();
  };

  return (
    <>
      {/* Floating button (mobile only) */}
      <button
        onClick={open}
        className={`md:hidden fixed bottom-6 right-10 z-50 p-3 rounded-full bg-black text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 `}
      >
        <FaFilter />
      </button>

      {/* Backdrop and rolling panel */}
      {showFilter && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          aria-hidden={false}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={close}
          />

          <div
            role="dialog"
            aria-modal="true"
            className="absolute left-0 right-0 bottom-0 m-4"
            style={{
              perspective: '800px'
            }}
          >
            <div
              className="mx-auto bg-[#111] text-white rounded-lg overflow-hidden shadow-2xl"
              style={{
                transformOrigin: 'bottom center',
                transform: showFilter ? 'translateY(0)' : 'translateY(100%)',
                opacity: showFilter ? 1 : 0,
                transition: 'transform 360ms cubic-bezier(.2,.9,.3,1), opacity 200ms ease'
              }}
            >
              <div className="flex items-center justify-between p-4 border-b border-[#222]">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={close}
                  aria-label="Close filters"
                  className="p-2 rounded-md hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-4">
                <p className="text-sm text-[#99A1AF] mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategory("All")}
                    aria-pressed={currentCategory === "All"}
                    className={`px-4 py-2 rounded-md text-sm transition-colors transition-transform active:translate-y-1 ${
                      currentCategory === "All"
                        ? 'bg-amber-300 text-black shadow'
                        : 'bg-transparent text-amber-300 border border-amber-300'
                    }`}
                  >
                    All
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.categoryId}
                      onClick={() => handleCategory(cat)}
                      aria-pressed={currentCategory === cat.categoryId}
                      className={`px-4 py-2 rounded-md text-sm transition-colors transition-transform active:translate-y-1 ${
                        currentCategory === cat.categoryId
                          ? 'bg-amber-300 text-black shadow'
                          : 'bg-transparent text-amber-300 border border-amber-300'
                      }`}
                    >
                      {cat.categoryTitle}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileFilter
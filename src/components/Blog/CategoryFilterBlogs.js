import React from 'react'

const CategoryFilterBlogs = ({ categories = [], value = 'All', loading = false, onChange }) => {
  const normalizedCategories = [{ label: 'All', value: 'All' }, ...categories.map((cat) => {
    const label = cat?.categoryTitle || cat?.name || cat?.categoryName || cat?.title || cat?.slug || cat;
    const rawVal = cat?.id ?? cat?.categoryId ?? cat?.slug ?? cat?.name ?? cat?.categoryName ?? cat;
    return { label, value: rawVal?.toString() ?? 'All' };
  })];

  const handleClick = (val) => {
    if (loading) return;
    onChange?.(val);
  };

  return (
    <div className="pt-1">
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto sm:overflow-visible">
        {normalizedCategories.map((cat) => (
          <button
            key={cat.value}
            className={`${value === cat.value
                ? 'bg-amber-300 text-black scale-105 -translate-y-[1px] shadow-md'
                : 'bg-transparent text-amber-300'}
              px-3 md:px-4 lg:px-5 py-1.5 md:py-2 transition-transform duration-150 cursor-pointer hover:scale-105 border border-amber-300 rounded-md whitespace-nowrap min-w-[88px] text-center focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-60 disabled:cursor-not-allowed`}
            onClick={() => handleClick(cat.value)}
            aria-pressed={value === cat.value}
            disabled={loading}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
      {loading && <p className="text-xs text-gray-400">Loading categories...</p>}
    </div>
  )
}

export default CategoryFilterBlogs
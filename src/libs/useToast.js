import { useCallback } from 'react'

export const useToast = () => {
  const showToast = useCallback((message, type = 'success') => {
    // Create toast element
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 px-4 py-3 rounded-lg text-black font-medium z-[9999] animate-fade-in-out ${
      type === 'success' ? 'bg-yellow-500' :
      type === 'error' ? 'bg-red-600' :
      type === 'warning' ? 'bg-yellow-600' :
      'bg-blue-600'
    }`
    toast.textContent = message
    
    document.body.appendChild(toast)
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('animate-fade-out')
      setTimeout(() => toast.remove(), 300)
    }, 3000)
  }, [])

  return { showToast }
}

import React from 'react'

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`px-4 py-3 text-indigo-900 placeholder-indigo-400 bg-white rounded-xl border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition shadow-sm ${className}`}
      {...props}
    />
  )
})

export default Input

import React from 'react'

const Button = React.forwardRef(({ children, className = '', disabled = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        bg-indigo-600 text-white font-semibold rounded-xl px-6 py-3
        hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed
        shadow-md
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button

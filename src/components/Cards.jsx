import React from 'react'

export const Cards = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 ${className}`}
    >
      {children}
    </div>
  )
}

export const CardContent = ({ children, className = '' }) => {
  return <div className={`p-6 sm:p-8 ${className}`}>{children}</div>
}

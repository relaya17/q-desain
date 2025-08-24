import React from 'react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* רקע עגול */}
        <circle cx="24" cy="24" r="24" fill="url(#gradient)" />
        
        {/* בית - גג */}
        <path d="M12 28 L24 16 L36 28 L36 40 L12 40 Z" fill="white" />
        
        {/* בית - דלת */}
        <rect x="20" y="32" width="4" height="8" fill="#1e3a8a" rx="1" />
        
        {/* בית - חלונות */}
        <rect x="14" y="26" width="3" height="3" fill="#1e3a8a" rx="0.5" />
        <rect x="31" y="26" width="3" height="3" fill="#1e3a8a" rx="0.5" />
        
        {/* בית - ארובה */}
        <rect x="30" y="18" width="2" height="6" fill="white" />
        
        {/* אותיות iq */}
        <text x="24" y="45" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial, sans-serif">
          iq
        </text>
        
        {/* גרדיאנט */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Logo

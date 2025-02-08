import React from 'react'

const ArrowUp: React.FC<{ width: string; height: string }> = ({ width, height }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04995 8.22168L11.9997 13.1714Z" fill="currentColor" />
            </svg>
        </>
    )
}

export default ArrowUp
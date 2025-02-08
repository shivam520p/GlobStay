import React from 'react'

const ArrowRight: React.FC<{ width: string; height: string }> = ({ width, height }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.23347 13L14.8898 7.42846C15.4106 6.91519 15.4106 6.08324 14.8898 5.57154L9.23347 0L7.34788 1.8581L10.7279 5.18669H0L0 7.81292H10.7279L7.34788 11.1427L9.23347 13Z" fill="currentColor" />
            </svg>
        </>
    )
}

export default ArrowRight
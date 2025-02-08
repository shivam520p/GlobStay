import React from 'react'

const SearchIco: React.FC<{ width: string; height: string }> = ({ width, height }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.25 0C10.976 0 14 3.024 14 6.75C14 10.476 10.976 13.5 7.25 13.5C3.524 13.5 0.5 10.476 0.5 6.75C0.5 3.024 3.524 0 7.25 0ZM7.25 12C10.1506 12 12.5 9.65063 12.5 6.75C12.5 3.84938 10.1506 1.5 7.25 1.5C4.34938 1.5 2 3.84938 2 6.75C2 9.65063 4.34938 12 7.25 12ZM13.614 12.0533L15.7353 14.1746L14.6746 15.2353L12.5533 13.114L13.614 12.0533Z" fill="currentColor" />
            </svg>
        </>
    )
}

export default SearchIco
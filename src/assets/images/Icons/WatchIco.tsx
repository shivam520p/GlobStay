import React from 'react'

const WatchIco: React.FC<{ width: string; height: string }> = ({ width, height }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9C16.5 13.1421 13.1421 16.5 9 16.5ZM9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15ZM9.75 9H12.75V10.5H8.25V5.25H9.75V9Z" fill="currentColor" />
            </svg>
        </>
    )
}

export default WatchIco

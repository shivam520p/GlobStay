import React from 'react'

const UserIco: React.FC<{ width: string; height: string }> = ({ width, height }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 16.5H13.5V15C13.5 13.7573 12.4927 12.75 11.25 12.75H6.75C5.50736 12.75 4.5 13.7573 4.5 15V16.5H3V15C3 12.929 4.67894 11.25 6.75 11.25H11.25C13.321 11.25 15 12.929 15 15V16.5ZM9 9.75C6.51472 9.75 4.5 7.73527 4.5 5.25C4.5 2.76472 6.51472 0.75 9 0.75C11.4853 0.75 13.5 2.76472 13.5 5.25C13.5 7.73527 11.4853 9.75 9 9.75ZM9 8.25C10.6568 8.25 12 6.90686 12 5.25C12 3.59314 10.6568 2.25 9 2.25C7.34314 2.25 6 3.59314 6 5.25C6 6.90686 7.34314 8.25 9 8.25Z" fill="currentColor" />
            </svg>
        </>
    )
}

export default UserIco

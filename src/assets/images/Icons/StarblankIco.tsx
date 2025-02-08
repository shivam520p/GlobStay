import React from 'react'

const StarblankIco: React.FC<{ width: string; height: string }> = ({ width, height }) => {
    return (
        <>
            <svg width={width} height={height} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99967 0.833252L12.8322 6.57159L19.1663 7.49742L14.583 11.9616L15.6647 18.2683L9.99967 15.2891L4.33467 18.2683L5.41634 11.9616L0.833008 7.49742L7.16717 6.57159L9.99967 0.833252Z" stroke="#FFA033" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </>
    )
}

export default StarblankIco
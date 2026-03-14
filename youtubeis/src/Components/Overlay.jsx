import React from 'react'

const Overlay = ({ onClick }) => {
    return (
        <div onClick={onClick} className='fixed inset-0 bg-black/50 z-40'>

        </div>
    )
}

export default Overlay

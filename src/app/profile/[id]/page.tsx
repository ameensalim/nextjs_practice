import React from 'react'

function UserProfile({ params }: any) {
    return (
        <div className='vw-100 vh-100 d-flex justify-content-center align-items-center'>User Profile
        <span className='p-2 rounded bg-warning text-dark m-2'>{params.id}</span>
        </div>
    )
}

export default UserProfile
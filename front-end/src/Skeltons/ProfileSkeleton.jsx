import { Skeleton } from '@mui/material'
import React from 'react'

export const ProfileSkeleton = () => {
    return (

        <div className='profileSkeleton'>
            <Skeleton variant='circular' width={150} height={150} />
            <div>
                <Skeleton variant='text' width={180} height={50} />
                <Skeleton variant='text' width={180} height={30} />
            </div>
        </div>

    )
}

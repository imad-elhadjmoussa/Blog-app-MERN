import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export const PostDetailsSkelton = () => {
    return (
        <div className='postDeatilsSkelton'>
            <div className='postInfo '>
                <div className='author'>
                    <Skeleton variant="circular" width={"60px"} height={"60px"} />
                    <Skeleton variant="rectangular" width={210} height={20} />
                </div>

                <p className='date' >
                    <Skeleton variant="text" width={"100px"} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" width={"100px"} sx={{ fontSize: '1rem' }} />
                </p>

            </div>

            <Skeleton width={"100%"} height={"400px"}  variant="rectangular" />

        </div>
    )
}

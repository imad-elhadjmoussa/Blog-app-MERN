import React from 'react'
import Skeleton from '@mui/material/Skeleton';

export const PostSkelton = () => {
    return (
        <div className='postSkelton'>
            <Skeleton className='image' variant="rectangular" height={"320px"} />
            <div className='content '>
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <div className="info ">
                    <div className='author '>
                        <Skeleton variant="circular" width={"45px"} height={"45px"} />
                        <div className='dateUsername '>
                            <Skeleton variant="text" sx={{ fontSize: '1.3rem' }} width={"100px"} />
                            <Skeleton variant="text" sx={{ fontSize: '1.3rem' }} width={"100px"} />
                        </div>
                    </div>
                </div>
                <Skeleton variant="rectangular" width={"100%"} height={"150px"} />
            </div>
        </div>
    )
}

import React from 'react'
import { format, formatISO9075 } from "date-fns"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Image } from './Image'
import { url } from '../utils/url';


export const Post = ({ post, isLoading }) => {
    return (
        <motion.div
            className='post'
            
        >
            <div className='image'>
                <Link to={`/post/${post._id}`}  >
                    {/* <img src={`http://localhost:4000/${post?.photo}`} alt="" /> */}
                    <Image
                        compressedSrc={`compressed-${post?.photo}`}
                        originalSrc={post?.photo}
                        imageClass="postImage"

                    />
                </Link>
            </div>

            <div className='content'>
                <h2 className='title'> {post?.title} </h2>
                <div className="info">
                    <Link className='author' to={`/profile/${post.author._id}`}  >
                        <img className="avatar" src={`${url}/${post?.author?.avatar}`} alt="" />
                        <div className='dateUsername'>
                            <p className='username'> {post?.author?.username} </p>
                            <p className='date'> {format(new Date(post?.date), "dd MMM yyyy")} </p>
                        </div>
                    </Link>
                </div>
                <p className='summary'> {post?.summary} ... </p>

                <Link to={`/post/${post?._id}`} className='readMore'> <p>Read More</p> </Link>
            </div>
        </motion.div>
    )
}

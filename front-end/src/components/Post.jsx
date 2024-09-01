import React from 'react'
import { format, formatISO9075 } from "date-fns"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';


export const Post = ({ post, isLoading }) => {
    return (
        <motion.div
            className='post'
        >
            <div className='image'>
                <Link to={`/post/${post._id}`}  >
                    {/* <img src={`http://localhost:4000/${post?.photo}`} alt="" /> */}
                    <LazyLoadImage
                        src={`http://localhost:4000/${post?.photo}`}
                        alt=""
                        effect="blur"
                    />
                </Link>
            </div>

            <div className='content'>
                <h2 className='title'> {post?.title} </h2>
                <div className="info">
                    <Link className='author' to={`/profile/${post.author._id}`}  >
                        <img className="avatar" src={`http://localhost:4000/${post?.author?.avatar}`} alt="" />
                        <div className='dateUsername'>
                            <p className='username'> {post?.author?.username} </p>
                            <p className='date'> {format(new Date(post?.date), "dd MMM yyyy")} </p>
                        </div>
                    </Link>
                </div>
                <p className='summary'> {post?.summary} </p>
            </div>
        </motion.div>
    )
}

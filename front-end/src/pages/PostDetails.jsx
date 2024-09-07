import { formatISO9075 } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { appContext } from '../App';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useErrorContext } from '../hooks/useErrorContext';
import { useAuth } from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import { useMutation, useQuery } from '@tanstack/react-query'
import { PostDetailsSkelton } from '../Skeltons/PostDetailsSkelton';
import { Error } from '../components/Error';
import { deletePost, getPost, getPosts } from '../apis/post';
import { Image } from '../components/Image';

export const PostDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPost(id),
    });

    const { mutate: deletePostMutate,error:deleteError,isPending:pendingDelete } = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: () => {
            setConfirmDelete(false);
            window.location.replace('/');
        },
    })

    if (isLoading) {
        return <PostDetailsSkelton />
    }

    if (error || deleteError) {
        return <Error error={error?.message || deleteError?.message } />
    }


    return (
        <motion.section
            className='postDetails'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {
                (user?.id === post?.author?._id) &&
                <div className='edit'>
                    <Link to={`/post/edit/${id}`}>
                        <button className='btn editBtn'>
                            <span>
                                <FontAwesomeIcon width={"20px"} height={"20px"} icon={faPenToSquare} />
                            </span>
                            
                        </button>
                    </Link>

                    <button onClick={() => { setConfirmDelete(true) }} className='btn delete'>
                        <FontAwesomeIcon width={"20px"} height={"20px"} icon={faTrash} />
                    </button>
                </div>
            }

            <div className='postInfo'>
                <Link to={`/profile/${post?.author?._id}`}>
                    <div className='author'>
                        <img src={`http://localhost:4000/${post?.author?.avatar}`} alt="" />
                        <p>{post?.author?.username}</p>
                    </div>
                </Link>

                <p className='date'>
                    {formatISO9075(new Date(post?.date || 0)).split(" ").reverse().map((item, index) => {
                        return (<span key={index}> {item} </span>)
                    })
                    }
                </p>

            </div>

            <div className='postImageContainer'>
                <Image compressedSrc={`compressed-${post?.photo}`} originalSrc={post?.photo} imageClass="postImage" />
            </div>

            <div className='post'>
                <h1 className='title'>{post?.title}</h1>
                <h3 className='summary'>{post?.summary}</h3>
                <div
                    dangerouslySetInnerHTML={{ __html: post?.content }}
                    className='content'
                >
                </div>
            </div>

            {
                confirmDelete &&
                <motion.div
                    className=' confirmDelete'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className='box'>
                        <p>Do you want to delete this post?</p>
                        <div className='btns'>
                            <button disabled={pendingDelete} onClick={() => { deletePostMutate(post?._id) }} className='btn delete'>Delete</button>
                            <button disabled={pendingDelete} className='btn cancel' onClick={() => { setConfirmDelete(false) }}>Cancel</button>
                        </div>
                    </div>
                </motion.div>
            }

        </motion.section>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { appContext } from '../App';
import { Post } from '../components/Post';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useErrorContext } from '../hooks/useErrorContext';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../apis/user';
import { getPosts } from '../apis/post';
import { PostSkelton } from '../Skeltons/PostSkelton';
import { ProfileSkeleton } from '../Skeltons/ProfileSkeleton';

export const Profile = () => {
    const { id } = useParams();
    const limit = 5;

    const { data: posts, isLoading: postsLoading } = useQuery({
        queryKey: ['posts', id, limit],
        queryFn: () => getPosts(id, limit),
    })

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
    })

    return (
        <motion.section
            className='profile'
        >
            {
                userLoading ?
                    <ProfileSkeleton />
                    :
                    <div className='info'>
                        <div className='profileImage'>
                            <img src={`http://localhost:4000/${user?.avatar}`} alt={user?.username} />
                        </div>
                        <div>
                            <h1> {user?.username} </h1>
                            <p className='email'>
                                {user?.email}
                            </p>
                        </div>
                    </div>
            }

            <div className='latestPosts'>
                <h1>Latest Posts</h1>
                <div className='posts'>
                    {
                        posts?.map(post => {
                            return <Post key={post._id} post={post} />
                        })
                    }
                    {
                        postsLoading && [1, 2].map((n) => {
                            return <PostSkelton key={n} />
                        })
                    }

                </div>
            </div>
        </motion.section >
    )
}

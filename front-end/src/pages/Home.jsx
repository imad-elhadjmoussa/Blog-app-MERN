import React, { useEffect, useState } from 'react'
import { Post } from '../components/Post'
import { PostSkelton } from '../Skeltons/PostSkelton';
import { useQuery } from '@tanstack/react-query';
import { Error } from '../components/Error';
import { getPosts } from '../apis/post';

export const Home = () => {

    const limit = 10;

    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts', limit],
        queryFn: () => getPosts("", limit),
    });

    if (error) {
        return <Error error={error.message} />
    }

    return (
        <section className=''>
            {
                posts && posts.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            post={post}
                        />
                    )

                })
            }

            {
                isLoading && [1, 2, 3, 4, 5].map((n) => {
                    return <PostSkelton key={n} />
                })
            }
        </section>
    )
}

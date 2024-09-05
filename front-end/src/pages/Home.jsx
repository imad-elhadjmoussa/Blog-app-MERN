import React, { useEffect, useState } from 'react'
import { Post } from '../components/Post'
import { PostSkelton } from '../Skeltons/PostSkelton';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Error } from '../components/Error';
import { getPosts } from '../apis/post';

export const Home = () => {

    const limit = 5;

    const {
        isLoading, error, data: posts, hasNextPage, fetchNextPage, isFetchingNextPage
    } = useInfiniteQuery(
        {
            queryKey: ['posts'],
            queryFn: ({ pageParam = 1 }) => getPosts({ limit, page: pageParam }),
            getNextPageParam: (lastPage, allPages) => {
                return lastPage?.hasMore ? allPages.length + 1 : undefined;
            }
        },
    )

    if (error) {
        return <Error error={error.message} />
    }

    if(!isLoading){
        console.log(posts);
    }

    return (
        <section className='home'>
            {
                posts && posts?.pages?.map((page, index) => {
                    return page?.posts?.map((post) => {
                        return <Post key={post._id} post={post} />
                    })

                })
            }

            {
                isLoading && [1, 2, 3].map((n) => {
                    return <PostSkelton key={n} />
                })
            }

            {
                hasNextPage &&
                <p className='loadMore' onClick={fetchNextPage} disabled={isFetchingNextPage}>View more posts</p>
            }

            {
                isFetchingNextPage && <PostSkelton />
            }
        </section>
    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { appContext } from '../App';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import { useErrorContext } from '../hooks/useErrorContext';
import { editPost, getPost, getPosts } from '../apis/post';
import { useMutation, useQuery } from '@tanstack/react-query';
import { set } from 'date-fns';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';

export const EditPost = () => {
    const { id } = useParams();
    const navigation = useNavigate();

    const [value, setValue] = useState('');

    const [post, setPost] = useState({
        title: '',
        summary: '',
        photo: '',
        content: ''
    });

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setPost({ ...post, [e.target.name]: e.target.files[0] });
            return;
        }
        setPost({ ...post, [e.target.name]: e.target.value });
    }


    const { mutate: editPostMutate,error:editError } = useMutation({
        mutationFn: () => editPost(id, { ...post, content: value }),
        onSuccess: () => {
            navigation(`/post/${id}`);
        }
    })

    const { error:fetchError, isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const data = await getPost(id);
            setPost(data)
            setValue(data.content)
            return data;
        },
    })

    if (isLoading) {
        return <Loading />
    }

    if (fetchError) {
        return <Error error={fetchError.message} />
    }


    return (
        <motion.section
            className=' createPost'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >
            {
                editError && <Error error={editError.message} />
            }
            <h1 className='title'>
                Edit Poste
            </h1>
            <form encType="multipart/form-data">
                <div >
                    <input className="input" type="text" name='title' placeholder="title" onChange={(e) => { handleChange(e) }} value={post?.title} />
                </div>

                <div >
                    <input className="input" type="text" name='summary' placeholder="summary" onChange={(e) => { handleChange(e) }} value={post?.summary} />
                </div>

                <div className="postPicture">
                    <input type="file" id="file" placeholder='Cc' className="input" name='photo' accept="image/*" onChange={(e) => { handleChange(e) }} />
                </div>

                <div>
                    <ReactQuill value={value} onChange={setValue} />
                </div>

                <div className='btns'>
                    <button type='button' onClick={editPostMutate} className="btn create">Edit Post</button>
                    <button className="btn reset"   >
                        <Link to={`/post/${id}`}  >
                            Cancel
                        </Link>
                    </button>
                </div>
            </form>
        </motion.section>

    )
}

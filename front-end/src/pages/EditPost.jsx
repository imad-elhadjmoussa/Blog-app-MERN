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


    const { mutate: editPostMutate } = useMutation({
        mutationFn: () => editPost(id, {...post, content: value}),
        onSuccess: () => {
            navigation(`/post/${id}`);
        }
    })

    const {  error,isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: async() => {
            const data =await getPost(id);
            setPost(data)
            setValue(data.content)
            return data;
        },
    })

    if(isLoading){
        return <Loading/>
    }

    if (error) {
        return <Error error={error.message} />
    }


    return (
        <motion.section
            className=' createPost'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >
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

                <div className="file-input postPicture ">
                    <input type="file" id="file" className="file-input__input" name='photo' onChange={(e) => { handleChange(e) }} />
                    <label htmlFor="file" className="file-input__label"  >
                        <svg className='file-input__icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span>post picture</span>
                    </label>
                </div>

                <div>
                    <ReactQuill value={value} onChange={setValue} />
                </div>

                <div className='btns'>
                    <button type='button' onClick={editPostMutate} className="btn create">Edit Post</button>
                    <Link to="/" className="btn reset" >
                        Cancel
                    </Link>
                </div>
            </form>
        </motion.section>

    )
}

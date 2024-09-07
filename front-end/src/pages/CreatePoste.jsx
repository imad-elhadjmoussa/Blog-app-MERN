import React, { useContext, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { appContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useErrorContext } from '../hooks/useErrorContext';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../apis/post';
import { Error } from '../components/Error';

export const CreatePoste = () => {

    const navigation = useNavigate();

    const [value, setValue] = React.useState('');
    const [post, setPost] = React.useState({
        title: '',
        summary: '',
        photo: '',
    });

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setPost({ ...post, [e.target.name]: e.target.files[0] });
            return;
        }
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const { mutate: cratePostMutate, isPending, error } = useMutation({
        mutationFn: () => createPost({ ...post, content: value }),
        onSuccess: () => {
            navigation('/')
        },

    })


    return (
        <motion.section
            className=' createPost'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >
            {
                error && <Error error={error.message} />
            }
            <h1 className='title'>
                Create Post
            </h1>
            <form encType="multipart/form-data">
                <div >
                    <input className="input" type="text" name='title' placeholder="title" onChange={(e) => { handleChange(e) }} />
                </div>

                <div >
                    <input className="input" type="text" name='summary' placeholder="summary" onChange={(e) => { handleChange(e) }} />
                </div>

                <div className="postPicture">
                    <input type="file" id="file" placeholder='Cc' className="input" name='photo' accept="image/*" onChange={(e) => { handleChange(e) }} />
                </div>

                <div>
                    <ReactQuill value={value} onChange={setValue} />
                </div>

                <div className='btns'>
                    <button disabled={isPending} type='button' onClick={cratePostMutate} className="btn create">Create Post</button>
                    <button type='reset' className="btn reset">Reset</button>
                </div>
            </form>
        </motion.section>
    )
}

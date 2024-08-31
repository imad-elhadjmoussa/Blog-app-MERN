import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRegister } from '../hooks/useRegister';
import { Error } from '../components/Error';

export const Register = () => {

    const { register, isPending, error } = useRegister();
    const [user, setUser] = React.useState(
        {
            username: '',
            email: '',
            password: '',
            avatar: ''
        }
    )

    const handleChange = (e) => {
        if (e.target.name === 'avatar') {
            setUser({
                ...user,
                avatar: e.target.files[0]
            })
            return;
        }

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <motion.section
            className='register'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {error && <Error error={error.message} />}
            <h1>Register</h1>
            <form >
                <div className="group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM19.5 21a9.75 9.75 0 00-15 0" />
                    </svg>
                    <input className="input" type="text" placeholder="username" name='username' onChange={(e) => { handleChange(e) }} />
                </div>

                <div className="group">
                    <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input className="input" type="email" placeholder="email" name='email' onChange={(e) => { handleChange(e) }} />
                </div>

                <div className="group">
                    <svg stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>

                    <input className="input" type="password" placeholder="password" name='password' onChange={(e) => { handleChange(e) }} />
                </div>

                <div className="userAvatar">
                    <input type="file" id="file" placeholder='Cc' className="input" name='avatar' accept="image/*" onChange={(e) => { handleChange(e) }} />
                </div>


                <div className='btns'>
                    <button disabled={isPending} onClick={() => {register(user) }} type='button' className="btn register">Register</button>
                    <button type='reset' className="btn reset">Reset</button>
                </div>

                <p>
                    Already have an account? <Link to="/login"><span>Login</span></Link>
                </p>

            </form>
        </motion.section>
    )
}

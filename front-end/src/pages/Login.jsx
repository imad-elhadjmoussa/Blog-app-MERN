import { motion } from 'framer-motion'
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Error } from '../components/Error';

export const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const { login, isPending, error } = useLogin();

    return (
        <motion.section
            className='login'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {
                error && <Error error={error.message} />
            }
            <h1>Login</h1>
            <form>
                <div className="group">
                    <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <input className="input" type="email" name='email' placeholder="email" onChange={(e) => { handleChange(e) }} />
                </div>

                <div className="group">
                    <svg stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" ></path>
                    </svg>
                    <input className="input" type="password" name='password' placeholder="password" onChange={(e) => { handleChange(e) }} />
                </div>

                <div className='btns'>
                    <button type='button' disabled={isPending} onClick={() => { login(user) }} className="btn login">Login</button>
                    <Link to="/" className="btn reset" >
                        Cancel
                    </Link>
                </div>

                <p>
                    Don't have an account? <Link to="/register"><span>Register</span></Link>
                </p>

            </form>
        </motion.section>
    )
}

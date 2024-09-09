import { Link } from 'react-router-dom'
import { useAuth } from './../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';
import { Skeleton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {url} from "../utils/url"

export const Header = () => {

    const { user,isLoading } = useAuth();
    const { logout } = useLogout();

    return (
        <header className="header">
            <nav className=' '>
                {/* logo */}
                <Link to='/' className='logo'>
                    <h1 className='logo'>
                        Blog App
                    </h1>
                </Link>
                {/* nav buttons */}

                {user ?
                    <div className='btns'>
                        <Link className='create' to='/create' >
                            Create Post
                        </Link>

                        {
                            isLoading ?
                            <Skeleton className='avatar' variant="circular" width={40} height={40} /> 
                            :
                            <Link className='avatar' to={`profile/${user.id}`} >
                                <img src={`${url}/${user?.avatar}`} alt="" />
                            </Link>
                        }

                        <Link to="/" >
                            <button onClick={logout} className='btn logout'> Logout </button>
                        </Link>

                    </div>
                    :
                    <div className='btns'>
                        <Link to='/login' >
                            <button className='btn'>Login</button>
                        </Link>
                        <Link to='/register' >
                            <button className='btn'>Register</button>
                        </Link>
                    </div>
                }


            </nav>
        </header>
    )
}

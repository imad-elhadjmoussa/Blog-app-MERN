import { Link } from 'react-router-dom'
import { useAuth } from './../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';

export const Header = () => {

    const { user } = useAuth();
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
                            user &&
                            <Link className='avatar' to={`profile/${user.id}`} >
                                <img src={`http://localhost:4000/${user?.avatar}`} alt="" />
                            </Link>
                        }

                        <Link to="/" >
                            <button onClick={logout} className='btn logout'>Logout</button>
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

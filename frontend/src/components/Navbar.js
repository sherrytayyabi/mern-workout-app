import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
//imports the modules and custom hooks

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    //lines call custom hooks 'useLogout' and 'useAuthContext'
    
    const handleClick = () => {
        logout()
    }
    //defines function named 'handleClick' and calls the 'logout' function obtained from the 'useLogout' hook


    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workout Tracker</h1>
                </Link>
                <nav>
                    {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                    )}
                    {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )}
                </nav>
            </div>
        </header>
    )
}
//JSX returned by the 'Navbar' component
//<nav> element which contains navigation links based on authentication status;
//if there is a 'user' = dispaly the users email and 'log out' button
//if no 'user' is logged in, display 'Login' and 'Signup' links

export default Navbar
import { useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    //creating two state variables which are email/password, and declared using the useState hook. variables hold the values of the email and password in the input fields

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login (email,password)
    }
    //function is called when the form is submitted, prevents the default form submission behaviour 
    //e.preventDefault stops the default form from being saved and resets it

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Email:</label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
//JSX represents the login form, and includes input fields for email and password 
//The onChange event handlers update the email and password state variables as user types
//The submit button is disabled when isLoading is true to prevent multiple submissions
//if there'es an error during the login process, its displayed with a <div> "error"

export default Login


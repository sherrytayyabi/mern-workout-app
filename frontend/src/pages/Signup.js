import { useState} from 'react'
import { useSignup } from '../hooks/useSignup'
//importing a useState hook from the React library 
//imports the 'useSignup' custom hook from the hooks folder 

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()
    //creating state variables, where these variables will hold the values of the email and password input fields in the form
    //calling the 'useSignup' hook and destructuring the return values
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }
    //The function 'handleSubmit' is activated when the form is submitted
    //Prevents default form submission (page reload) using 'e.preventDefault()' then calls the 'signup' function which is passing the 'emai' and 'password' parameters

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

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

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
        //returning JSX that represents the signup form 
        //'onSubmit' attribute of the form is set to the 'handleSubmit' function, so it will be called when the form is submitted
    )
}

export default Signup
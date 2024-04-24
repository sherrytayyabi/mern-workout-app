import { useState } from "react";
import { useAuthContext } from './useAuthContext'
//import statements 

export const useSignup = () => {
    //initializing state variables for error and loading state
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    //Accessing dispatch functions from the auth context using useAuthContext hook
    const { dispatch } = useAuthContext()
   
    //Define the signup function to handle user signup
    const signup = async(email, password) => {
        //Sets loading state to true and lcearing any previous errors
        setIsLoading(true)
        setError(null)

        //Making a post request to the signup API endpoint with email and password
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        //Parsing the JSON response
        const json = await response.json()

        //Handling errors if the response is not OK 
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            //saves user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //updates the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
} 


//Hook gets all the logic needed to sign up a user in the app 
//Need to call 'signup' and it takes care of the process for you, where it sends requests to the server, updating the state, and handling errors 
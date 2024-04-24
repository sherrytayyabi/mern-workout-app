import { createContext, useReducer, useEffect }  from 'react' 
//imports the functions and hooks from the React Library 'createContext' for creating the authentication context and 'useReducer' for managing state using a reducer function

export const AuthContext = createContext()
//creates authetnication context using 'createcontext()', context will be used to share authetnication related state and functions across the React component tree

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}
//'authReducer' function takes the current state and action, and returns the new state. It will handle the user login and layout
// When a 'LOGIN' action is dispatched, it updates the state with the user data ('action.payload')
// When a 'LOGOUT' action is dispatched, it resets the user to null


export const AuthContextProvider = ({ children }) => { //define the AuthContextProvider component
    const [state, dispatch] = useReducer(authReducer, { //initialize state using useReducer hook
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) //checks to see if there's a user in local storage

        if (user) {
            dispatch({ type: 'LOGIN', payload: user}) //if user is found, dispatch LOGIN action
        }
    }, []) //empty dependency array make sures useEffect only runs once 

    console.log('AuthContext state: ', state) 

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
//Component acts as a provider for the authentication context
//Uses the 'useReducer' hook to manage the authentication state based on the 'authReducer' function
//initial state is set to '{user: null}'
//'AuthContext.Provider' component wraps its children, providing them with access to the authentication state ('state') and the 'dispatch' function to dispatch actions to update the state
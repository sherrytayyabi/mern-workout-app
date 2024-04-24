import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}
//File defines a custom hook ('useAuthContext') that provides access to the state and dispatch function defined in the 'useAuthContext'
//Ensures the components using this hook are wrapped in 'useAuthContext' which help maintain consistency and prevent errors in the application
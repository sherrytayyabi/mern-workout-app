import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextsProvider')
    }

    return context
}

//File defines a custom hook ('useWorkoutsContext') that provides access to the state and dispatch function defined in the 'WorkoutsContext'
//Ensures the components using this hook are wrapped in 'WorkoutsContextProvider' which help maintain consistency and prevent errors in the application
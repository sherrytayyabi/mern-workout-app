import { createContext, useReducer } from 'react'; 
//imports functions and hooks from the React Libarary: 'createContext' for creating the context and 'useReducer' for managing state using the reducer function

export const WorkoutsContext = createContext()
//creates a context named 'WorkoutsContext' using 'createContext()', the context will be used to share state and dispatch functions related to workouts across the React componenet tree

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS': 
            return {
                workouts: action.payload
            }
            case 'CREATE_WORKOUT':
                return {
                    workouts: [action.payload, ...state.workouts]
                }
            case 'DELETE_WORKOUT':
                return {
                    workouts: state.workouts.filter((w) => w._id !== action.payload._id)
                }
            default:
                return state
    }
}
//workoutsReducer is a function that takes the current state and an action, and returns a new state. Handles actions related to setting workouts, creating a new workout, and deleting a workout
 
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, { 
        workouts: null
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}
//component acts as a provider for the 'WorkoutsContext', uses the 'useReducer' hook to manage the state based on the 'workoutsReducer' function
//the inital state is set to `{ workouts: null }` Then the 'WorkoutsContext.Provider' component wraps its children, providing access to the state('state'), and 'dispatch' function to dispatch actions to update the state


//code sets up a context and provider for managing workouts related state using React's Context API and the 'useReducer' hook
//defines the reducer function to handle state updates based on various actions, and provides state and dispatch functions to its components through the context provider
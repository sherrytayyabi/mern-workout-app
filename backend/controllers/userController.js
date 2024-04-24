const User = require('../models/userModel') //imports 'User' model from the 'userModel' file, 'User' represents the schema and operations related to users in the application
const jwt = require('jsonwebtoken') //imports the JWT (Jason Web Token) module for authentication

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' }) //function generates a JWT with the user ID as the payload, signs it using a secret key, and sets an expiration date for 3 days
}


// login user 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
//Defines the 'loginUser' function, that handles the logic for logging in a user. Here we send a JSON response with a message indicating that the user is logged in


// signup user 
const signupUser = async (req, res) => { // 'signupUser' function is an asynchronous function responsible for handling the signup process when a client sends a signup request to the server
    const {email, password} = req.body  // extracts the 'email' and 'password' fields from the request body
    
    try {
        const user = await User.signup(email, password) //functions calls the 'User.signup' method with the 'email', 'password', extracted from the request body. Method handles the creation of a new user in the database

//create a token
const token = createToken(user._id)//delcares a variable token to store the JWT created. Then calls a function, passing the 'user_id' identifier as an argument. This function is to generate a JWT based on the provided user ID


res.status(200).json({email, token}) //sends a JSON response with the provided data. Includes the 'email' and 'token' in the response body
} catch (error) {
res.status(400).json({error: error.message}) //if error occurs during the signup process, function catches an error, and sends a JSON response with a status code of 400(Bad Request) and includes the error message
}
}


module.exports = { loginUser, signupUser} 
//exports the 'loginUser' and 'signupUser' functions from the module, so it can be imported and used in other parts of the application

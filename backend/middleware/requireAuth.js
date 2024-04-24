const jwt = require('jsonwebtoken') 
const User = require('../models/userModel') 
//Import necessary modules and dependencies

const requireAuth = async(req, res, next) => { //Middleware function for requiring authentication

    //Verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token needed'})
    }
    //Check if 'authorization' header is missing, and if missing send a 401 status

    const token = authorization.split(' ')[1] //Split the authorization header value to extract the token

    try {
        const {_id} = jwt.verify(token, process.env.SECRET) //Verify the token using the secret key

    req.user = await User.findOne({ _id }).select('_id') //Find the next user in the database based on the user ID
        next() //Call the next middleware in the chain

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
    //if any errors occur, send a 401 error message, saying that the request is not authorized
}

module.exports = requireAuth
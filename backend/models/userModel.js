const mongoose = require('mongoose') //imports the'mongoose' library, popular modeling tool designed to work in asynchronous enviornments like Node.js
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema // creates a reference to the 'Schema' consturctor function from the 'mongoose' library

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})
//defines a new function called  'userSchema', using the Schema constructor function 
//Specifies the structure of the documents that will be stored in the MongoDB collection for users

// static signup method
userSchema.statics.signup = async function(email,password) { //defines a method named 'signup' on the userSchema' model. Method takes email,password as parameters 


// validation
if (!email || ! password) {
    throw Error('All fields must be filled')
} //checks if either the 'email' or 'password' field is empty
if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
} //checks if the 'email' field contains a valid email address format using the 'validator.isEmail()' function
if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
} //checks if the 'password' field meets certain strength criteria using the 'validator.isStrongPassword()' function


const exists = await this.findOne({ email }) //Uses 'this' to refer to the model itself and calls the 'findOne' method to check if a user with email already exists in the database
    //It awaits the result of the query and stores it in the'exists' variable

if (exists) {
    throw Error('Email already in use')
}
//If user with provided email exists, ('exists' is truthy), line throws an error with the messagge "Email already in use", and prevents the creation of duplicate users with same email

const salt = await bcrypt.genSalt(10) //generates a salt using the 'bcrypt' library (random value used to add additional input to the hash function)
const hash = await bcrypt.hash(password, salt) //line hashes the user's password using the generated salt

const user = await this.create({ email, password: hash }) //line creates a new user document in the database using the 'create' method provided by Mongoose

return user //returns the newly created user document from the 'signup' method
}


//static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) { 
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}








module.exports = mongoose.model('User', userSchema)
 //exports user schema named 'User'. Mongoose models are constructors that represent documents stored in the MongoDB collection
//exporting the model, allows other parts of the application to interact with the MongoDB database ex: creating, updating, and deleting user documents
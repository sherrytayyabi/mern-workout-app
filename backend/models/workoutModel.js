 const mongoose = require('mongoose')

 const Schema = mongoose.Schema

 const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number, 
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
 }, { timestamps: true })

 module.exports = mongoose.model('Workout', workoutSchema)

 //Code defines a Mongoose schema for a workout entity with specific fileds for number of reps, weight, and a User ID
 //Mongoose implements a timestamps for the creation and modification of workout documents 
 //It then exports a Mongoose model named `'Workout'` based on the schema

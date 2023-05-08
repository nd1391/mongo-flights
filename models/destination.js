const { Schema, model } = require('mongoose')

const destinationSchema = new Schema({
    airport: {type: String, enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA']},
    arrival: {type: Date, default: Date.now()}
})

const Destination = model('Destination', destinationSchema)
module.exports = Destination;
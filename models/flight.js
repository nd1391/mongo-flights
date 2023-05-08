const { Schema, model } = require('mongoose')
const Destination = require('./destination')

const flightSchema = new Schema({
    airline: {
        type: String, 
        enum: ['American', 'Southwest', 'United'],},
    flightNo: {
        type: Number, 
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: Date.now(),
    },
    airport: {type: String, enum: ['AUS', 'DAL', 'LAX', 'SAN', 'SEA'], default: 'SAN'},
    destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }]
},
{
    timestamps: true,
}
)

const Flight = model('Flight', flightSchema);

module.exports = Flight
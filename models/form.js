const mongo = require('mongoose')

const Schema = new mongo.Schema({
    id: String,
    participant: [String],
    dateJour: String
});

module.exports = mongo.model('form', Schema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var manageSchema = new mongoose.Schema({
    title: String,
    number: Number
})

module.exports = mongoose.model('Manages', manageSchema);

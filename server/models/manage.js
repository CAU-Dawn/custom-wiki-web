var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var manageSchema = new mongoose.Schema({
    title: String,
    number: Number,
    password: {type: Number, default: 1088231} 
})

module.exports = mongoose.model('Manages', manageSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trendSchema = new mongoose.Schema({
    title: String,
    edit: {type:Number, default:1},
    search: {type:Number, default:1}
})

module.exports = mongoose.model('Trends', trendSchema);

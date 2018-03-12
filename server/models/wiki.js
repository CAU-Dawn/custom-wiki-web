var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wikiSchema = new mongoose.Schema({
    title: String,
    author: String,
    password: {type:String, default:null},
    contents: Object,
    number: { type: Number, default: 0},
    date: { type: Date, default: Date.now },
    deleted : {type: Boolean, default:false}
})

var manageSchema = new mongoose.Schema({
    title: String,
    totalcount: Number
})

module.exports = mongoose.model('Wikis', wikiSchema);
module.exports = mongoose.model('Manage', manageSchema);

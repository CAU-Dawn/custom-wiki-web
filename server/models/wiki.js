var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wikiSchema = new mongoose.Schema({
    title: String,
    password: {type:String, default:null},
    contents: Object,
    number: { type: Number, default: 0},
    viewCount: { type: Number, default: 0},
    date: { type: Date, default: Date.now },
    deleted : {type: Boolean, default:false},
    permission : {type: Number, default:1}
})

module.exports = mongoose.model('Wikis', wikiSchema);

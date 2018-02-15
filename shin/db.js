var mongoose = require('mongoose');

var wikiSchema = new mongoose.Schema({
    title: String,
    author: String,
    data: Object,
    edited_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('wiki', wikiSchema);

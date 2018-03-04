var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wikiSchema = mongoose.Schema({
    time: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    }
    /*
    user: {
        id: Schema.ObjectId,
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: { type:String, default: 'TO-DO'} */
})

module.exports = mongoose.model('Wikis', wikiSchema);

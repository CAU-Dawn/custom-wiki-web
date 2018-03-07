var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wikiSchema = new mongoose.Schema({
    title: String,
    author: String,
    data: Object,
    edited_date: { type: Date, default: Date.now }

    //모델링 디테일하게 바꿀것을 아래와 같다.
    /*
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

    user: {
        id: Schema.ObjectId,
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: { type:String, default: 'TO-DO'} */
})

module.exports = mongoose.model('Wikis', wikiSchema);

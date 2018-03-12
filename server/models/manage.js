var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var manageSchema = new mongoose.Schema({
    title: String,
    totalcount: {type: Number, default: 0}
})

module.exports = mongoose.model('Manage', manageSchema);

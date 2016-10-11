/**
 * Created by Raphson on 6/30/16.
 */
var mongoose = require('mongoose');
var schema =  mongoose.Schema;
var jobSchema = new schema({
    title: {type: String},
    description: {type: String, required: true},
    company: {type: String, required: true},
    registered_on: {type: Date, default: Date.now()},
    postedBy: {type : schema.ObjectId, ref: 'user'},
});

module.exports = mongoose.model('job', jobSchema, 'jobs');
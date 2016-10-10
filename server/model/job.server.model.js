/**
 * Created by Raphson on 6/30/16.
 */
var mongoose = require('mongoose');
var jobSchema = mongoose.Schema({
    title: {type: String},
    description: {type: String, required: true},
    company: {type: String, required: true},
    registered_on: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('job', jobSchema, 'jobs');
/**
 * Created by Raphson on 6/30/16.
 */
var mongoose = require('mongooose');
var projectSchema =  mongoose.Schema({
    name: { type: String, unique: true, required: true},
    slug: {type: String},
    description: {type: String},
    url: {type: String, required: true, unique: true},
    postedBy: {type : schema.ObjectId, ref: 'user'},
    snapshot: {type: String, default: ''},
    registered_on: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('project', projectSchema, 'projects');

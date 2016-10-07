/**
 * Created by Raphson on 6/30/16.
 */
var cloudinary = require('cloudinary');
var multiparty  = require('multiparty');
var Async = require('async');
var slug = require('slug');
var project = require('../model/project.server.model');
module.exports = {

    /**
     * Saves A project Details Posted By User
     * @param  {void}   req
     * @param  {void}   res
     * @return {object}
     */
    shareProject: function(req, res){
        Async.waterfall([
            function(cb){
                var projectUrl = req.body.url;
                var url = cloudinary.url(projectUrl,{
                    type: "url2png",
                    secure: true,
                    crop: "fill",
                    width: 300,
                    height: 200,
                    gravity: "north",
                    sign_url: true
                });
                console.log("url", url);
                cb(null, url);
            }
        ], (err, result) => {
            var newProject = new project({
                name: req.body.name,
                slug: slug(req.body.name),
                description: req.body.description,
                url: req.body.url,
                postedBy: req.user,
                snapshot: result,
            });
            newProject.save((err, projects) => {
                if(err){
                    console.log(err);
                    if(err.name == 'MongoError' && err.message.indexOf('$name_1') > 0 ||
                        err.message.indexOf('$url_1') > 0 ) {
                        return res.status(200)
                            .json({ success: false, message: 'Project is registered already. Please choose another' });
                    } else {
                        return res.status(500).json({success: false, message: 'Internal Server'});
                    }
                } else {
                    return res.status(200).json({success: true, message: "Project Shared successfully."});
                }
            })
        });
    },

    /**
     * @param req
     * @param res
     * @return {object}
     */
    getAllProjects: function(req, res){
        project.find({}, function(err, projects){
            return res.status(200).send(projects);
        });
    },

    /**
     * Fetch the Details of Each Project
     * @param  {void}   req
     * @param  {void}   res
     * @return {object}
     */
    getEachProjectDetails: function(req, res){
        var pSlug = req.params.projectSlug;
        project.find({slug: pSlug}, function(err, project){
            if(err) {
                console.log( err );
                return res.status(500).json({ message: err.message });
            }

            if(project.length == 0){
                return res.status(404).json({ message: "Project Not Found." });
            } else {
                var projectDetails = {};
                var projects = [0];
                projectDetails.id = projects._id;
                projectDetails.name = projects.name;
                projectDetails.slug = projects.slug
                projectDetails.description = projects.description;
                projectDetails.url = projects.url;
                projectDetails.postedBy = projects.postedBy;
                projectDetails.snapshot = projects.snapshot;
                projectDetails.postedOn = projects.registered_on;
                projectDetails.public_id = projects.public_id;

                return res.status(200).json(projectDetails)
            }
        });
    },

    /**
     * Delete A Project
     * @param  {void}   req
     * @param  {void}   res
     * @return {object}
     */
    deleteEachProject: function(req, res, next){
        var projectId   = req.params.id;

        project.remove({_id: projectId}, function (err, project) {
            if(err) {
                return res.status(404).json({message: 'Project Details Not Found'});
            }
            return res.status(200).json({success: true, message: 'Delete Successful'});
        });
    }

}
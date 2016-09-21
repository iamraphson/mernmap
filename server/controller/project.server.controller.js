/**
 * Created by Raphson on 6/30/16.
 */
var cloudinary = require('cloudinary');
var multiparty  = require('multiparty');
var slug = require('slug');
var project = require('../model/project.server.model');
module.exports = {

    /*
    *   upload image to cloudinary
    *   @param req
    *   @param res
    *   @return json
    */
    uploadProjectSnap: function(req, res){
        var fileName = '';
        var size = '';
        var form = new multiparty.Form();

        form.on('error', function(err){
            console.log('Error parsing form: ' + err.stack);
        });
        form.on('part', function(part){
            if(!part.filename){
                return;
            }
            size = part.byteCount;
            fileName = part.filename;
        });
        form.on('file', function(name, file){
            cloudinary.uploader.upload(file.path, function(response){
                return res.json({ response: response });
            }, { resource_type: "image" });
        });
        form.on('close', function(){
            console.log('Uploaded!!');
        });
        form.parse(req);
    },

    /**
     * Saves A project Details Posted By User
     * @param  {void}   req
     * @param  {void}   res
     * @return {object}
     */
    shareProject: function(req, res){
        var newProject = new project({
            name: req.body.name,
            slug: slug(req.body.name),
            description: req.body.description,
            url: req.body.url,
            postedBy: req.user._id,
            snapshot: req.body.snap,
            public_id: req.body.public_id,
        });

        newProject.save(function( err, project){
            if(err) {
                console.log( err );
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({success: true, message: "Project Shared successfully." });
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
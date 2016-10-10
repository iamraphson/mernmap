/**
 * Created by Raphson on 6/30/16.
 */
var job = require('../model/job.server.model');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @return {object}
     */
    create: function(req, res){
        var job = new job({
            title: req.body.title,
            description: req.body.description,
            company: req.body.company
        });

        job.save(function(err, job){
            if(err) {
                console.log( err );
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({success: true, message: "Job submitted successfully."});
        })
    },

    /**
     *
     * @param req
     * @param res
     * @return {object}
     */
    getAllJobs: function(req, res){
        job.find({}, function(err, jobs){
            return res.status(200).send(jobs);
        });
    }
}
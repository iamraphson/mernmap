/**
 * Created by Raphson on 10/5/16.
 */
import BaseStore from './BaseStore'
let AppConstants = require('../constants/AppConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

    if (!Object.assign) {
        Object.assign = require('object-assign');
    }
let ProjectStore = Object.assign({}, BaseStore, {
    shareProjectResult: null,
    projects: null,
    project: null,

    setShareProjectResult(shareProjectResult) {
        this.shareProjectResult = shareProjectResult;
        this.emitChange('shareProject');
    },

    getShareProjectResult()  {
        return this.shareProjectResult
    },

    setProjects(projects) {
        this.projects = projects;
        this.emitChange('fetchProjects');
    },

    getProjects()  {
        return this.projects
    },

    setProject(project) {
        this.project = project;
        this.emitChange('fetchProject');
    },

    getProject()  {
        return this.project
    },

});

AppDispatcher.register((action) => {
    switch (action.actionType){
        case AppConstants.PROJECT_SHARE :
            ProjectStore.setShareProjectResult(action.data);
            break;
        case AppConstants.GET_PROJECTS :
            ProjectStore.setProjects(action.data);
            break;
        case AppConstants.GET_PROJECT :
            ProjectStore.setProject(action.data);
            break;
        default:
        // no default action
    }
    return true;
});

module.exports = ProjectStore;
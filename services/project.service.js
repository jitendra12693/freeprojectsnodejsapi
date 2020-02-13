const db = require('_helpers/db');
const Project = db.Project;

module.exports = {
    getAll,
    getById,
    addproject,
    //update,
    //delete: _delete
};

async function getAll(){
    return await Project.find().select('-hash');
}

async function getById(id){
    return await Project.findById(id).select('-hash');
}

async function addproject(projects) {
    // validate
    console.log(JSON.stringify(projects));
    if (await Project.findOne({ ProjectName: projects.ProjectName })) {
        throw 'ProjectName "' + projects.ProjectName + '" is already available. Please provide some other project name.';
    }
    
    const project = new Project(projects);

    // save user
    await project.save();
    console.log('checking');
}
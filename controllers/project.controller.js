const express = require('express');
const router = express.Router();
const projectService = require('../services/project.service');

// routes
router.post('/addproject', addproject);
router.get('/', getAll);
//router.get('/current', getCurrent);
router.get('/:id', getById);
//router.post('/:id', update);
//router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    projectService.getAll()
        .then(project => res.json(project))
        .catch(err => next(err));
}

function getById(req,res,next){
    projectService.getById(req.params.id)
    .then(project=>project?res.json(project):res.sendStatus(400))
    .catch(err=> next(err));
}

function addproject(req, res, next) {
    projectService.addproject(req.body)
        .then(() => res.json({
            
        }))
        .catch(err => next(err=>{
            console.log(err);
        }));
}
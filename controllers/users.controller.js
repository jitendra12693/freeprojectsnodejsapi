const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.post('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

async function authenticate(req, res, next) {
    try{
        let userResponse = await userService.authenticate(req.body);
        console.log(userResponse);
        res.json({success:true,data:userResponse});
    }
    catch (ex) {
        next(ex);
    }
}

async function register(req, res, next) {
    try{
        let userResponse = await userService.create(req.body);
        res.json({success : true, data : userResponse});
    }
    catch(ex){
        next(ex)
    }
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

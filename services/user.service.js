const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
//const User = db.User;
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ Email, Password }) {
    const user = await User.findOne({ Email });
    if (user && bcrypt.compareSync(Password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    let response = {};
    try {
        let userdata = await User.findOne({ Email: userParam.Email }).lean(true);
        if (userdata) {
            response = `Email, ${userParam.Email} is already taken`;
        }
        else{
            // save user
            const user = new User(userParam);
            if (userParam.Password) {
                user.hash = bcrypt.hashSync(userParam.Password, 10);
            }
            userdata = await user.save().lean(true);
            delete response._id;
            delete response.__v;
            response = userdata;
        }
        return response;
    }
   catch (ex) {
        console.log("-----------------------------", ex  );
   }
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.Email !== userParam.Email && await User.findOne({ Email: userParam.Email })) {
        throw 'Email "' + userParam.Email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

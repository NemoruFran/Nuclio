const mongoose = require("mongoose");
//const ObjectId = require("mongoose").Types.ObjectId; //Esto para usar el tipo ObjectId si necesitas usarlo varias veces
require("../pins/pins.model");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "pins"
    }]
});
//usar .populate en el controlador para sacar los pines --> User.find().populate('pins');

const UserModel = mongoose.model("users", UserSchema);

const create = async (pin) => {
    const userCreated = await UserModel.create(pin);
    return userCreated;
};

const getAll = async () => {
    const users = await UserModel.find();
    return users;
};

const getId = async (id) => {
    const user = await UserModel.findById(id).populate('following');
    return user;
}

const update = async (id,newbody) => {
    const user = await UserModel.findByIdAndUpdate(id,newbody,{new:true});
    return user;
}

const deleteId = async (id) => {
    await UserModel.findByIdAndDelete(id);
}

module.exports = {
    create,
    getAll,
    getId,
    update,
    deleteId
};

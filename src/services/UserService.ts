import type { User } from "../types";

var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    id: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

const userModel = mongoose.model("User", UserSchema);
const retrieveById = (id: string) => userModel.findOne().where("id").equals(id);

const createUser = async (user: User): Promise<void> => {
    return await userModel.create(user);
};

const queryUsers = async (): Promise<void> => {
    return await userModel.find({})
};

const getUserById = async (id: string): Promise<void> => {
    return await retrieveById(id)
};

const updateUser = async (id: string, user: User): Promise<void> => {
    return await retrieveById(id).updateOne(user);
};

const deleteUser = async (id: string): Promise<void> => {
    return await retrieveById(id).deleteOne();
};

module.exports = {
    queryUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
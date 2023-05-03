import type { User } from "../types";
import { v4 as uuidv4 } from 'uuid';

import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    id: {
        type: String,
        unique: true,
        default: uuidv4()
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const userModel = mongoose.model("User", UserSchema);
const retrieveById = (id: string) => userModel.findOne().where("id").equals(id);

const createUser = async (user: User): Promise<mongoose.Document<unknown, object, User>> => {
    return await userModel.create(user);
};

const queryUsers = async (limit: number, offset: number): Promise<(mongoose.Document<unknown, {}, User>)[]> => {
    return await userModel.find({}).skip(offset).limit(limit).exec();
};

const getUserById = async (id: string): Promise<(mongoose.Document<unknown, {}, User> | never | null)> => {
    return await retrieveById(id)
};

const updateUser = async (id: string, user: User): Promise<mongoose.UpdateWriteOpResult> => {
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
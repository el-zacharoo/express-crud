import { v4 as uuidv4 } from 'uuid';

import mongoose, { Document, UpdateWriteOpResult } from "mongoose";

type User = {
    name: string;
    email: string;
    id: string;
    date: Date;
}

const { Schema } = mongoose;

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

const userModel = mongoose.model<User & Document>("User", UserSchema);
const retrieveById = (id: string) => userModel.findOne().where("id").equals(id);

const createUser = async (user: User): Promise<Document<User & Document>> => {
    return await userModel.create(user);
};

const queryUsers = async (limit: number, offset: number): Promise<Array<(Document<User & Document>)>> => {
    return await userModel.find({}).skip(offset).limit(limit).exec();
};

const getUserById = async (id: string): Promise<(Document<User & Document> | never | null)> => {
    return await retrieveById(id)
};

const updateUser = async (id: string, user: User): Promise<UpdateWriteOpResult> => {
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
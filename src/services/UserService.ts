import { v4 as uuidv4 } from 'uuid';

import mongoose, { Document, UpdateWriteOpResult } from "mongoose";

type Services = {
    createUser: (user: User) => Promise<Document<User & Document>>;
    queryUsers: (limit: number, offset: number) => Promise<Array<(Document<User & Document>)>>;
    getUserById: (id: string) => Promise<(Document<User & Document> | never | null)>;
    updateUser: (id: string, user: User) => Promise<UpdateWriteOpResult>;
    deleteUser: (id: string) => Promise<void>;
}

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

const retrieveById = (id: string) => userModel.findOne().where("id").equals(id);

export const userModel = mongoose.model<User & Document>("User", UserSchema);

export const userService = (): Services => {

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

    return { createUser, queryUsers, getUserById, updateUser, deleteUser };
};
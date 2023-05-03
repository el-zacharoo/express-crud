import type { User } from "../types";
import { v4 as uuidv4 } from 'uuid';

var userService = require("../services/UserService");

type Request = {
    body: User;
    params: {
        id: string;
    }
}

type Response = {
    json: (arg0: { data: User; status: string; }) => void;
    status: any;
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    // uuid is used to generate a random id for the user
    req.body.id = uuidv4();

    try {
        const user = await userService.createUser(req.body);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const queryUsers = async (req: undefined, res: Response): Promise<void> => {
    try {
        const users = await userService.queryUsers();
        res.json({ data: users, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const blog = await userService.updateUser(req.params.id, req.body);
        res.json({ data: blog, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    queryUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};


import type { Request, Response } from "../types";

var userService = require("../services/UserService");


const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.createUser(req.body);
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const queryUsers = async (req: Request, res: Response): Promise<void> => {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    try {
        const users = await userService.queryUsers(limit, offset);
        res.json({ data: users, matches: users.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.json({ data: user });
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
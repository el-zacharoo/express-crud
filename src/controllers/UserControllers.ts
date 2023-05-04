import { Request, Response } from "express";

import { userService } from "../services/UserService";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { createUser } = userService();

    try {
        const user = await createUser(req.body);
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const queryUsers = async (req: Request, res: Response): Promise<void> => {
    const { queryUsers } = userService();

    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    try {
        const users = await queryUsers(limit, offset);
        res.json({ data: users, matches: users.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { getUserById } = userService();

    try {
        const user = await getUserById(req.params.id);
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { updateUser } = userService();

    try {
        const user = await updateUser(req.params.id, req.body);
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { deleteUser } = userService();

    try {
        const user = await deleteUser(req.params.id);
        res.json({ data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

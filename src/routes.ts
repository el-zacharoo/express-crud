import * as express from "express";

import {
    createUser,
    queryUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "./controllers/UserControllers";

export const router = express.Router();

router.route("/").get(queryUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
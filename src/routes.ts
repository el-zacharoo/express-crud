import * as express from "express";

var {
    createUser,
    queryUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("./controllers/UserControllers");

export const router = express.Router();

router.route("/").get(queryUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
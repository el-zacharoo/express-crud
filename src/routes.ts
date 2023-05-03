var express = require("express");
var {
    createUser,
    queryUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("./controllers/UserControllers");

const router = express.Router();

router.route("/").get(queryUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
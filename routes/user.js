const express = require("express");

const userController = require("../controller/user");

const router = express.Router();

router.get("/", userController.getUsers);

router.get("/:userID", userController.getUsersByID);

router.post("/", userController.addUser);

router.patch("/:userID", userController.updateUser);

router.delete("/:userID", userController.deleteUser);

module.exports = router;

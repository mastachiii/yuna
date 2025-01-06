const express = require("express");
const controller = require("../controller/folderController");
const { Folder } = require("../model/queries");
const auth = require("../helpers/authMiddleware");

const db = new Folder();

const router = express.Router();

router.get("/:id", auth.isAuthenticated, controller.getFolder);

router.post("/:id", controller.createFolder);
router.post("/:id/delete", controller.deleteFolder);

module.exports = router;

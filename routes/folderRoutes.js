const express = require("express");
const controller = require("../controller/folderController");
const { Folder } = require("../model/queries");
const auth = require("../helpers/authMiddleware");

const db = new Folder();

const router = express.Router();

// TODO: prob a get request would query db for single folder then render it...
router.get("/:id", auth.isAuthenticated, controller.getFolder);

router.post("/:id", controller.createFolder);

module.exports = router;

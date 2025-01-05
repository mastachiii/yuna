const express = require("express");
const controller = require("../controller/folderController");
const { Folder } = require("../model/queries");

const db = new Folder();

const router = express.Router();

// TODO: prob a get request would query db for single folder then render it...
router.get("/:id", controller.getFolder);

router.post("/", controller.createFolder);

module.exports = router;

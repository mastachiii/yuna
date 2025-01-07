const express = require("express");
const controller = require("../controller/folderController");
const { Folder } = require("../model/queries");
const auth = require("../helpers/authMiddleware");

const router = express.Router();

router.get("/:id", auth.isAuthenticated, controller.getFolder);
router.get("/public/:id", controller.getPublicFolder);
router.get("/share/:username/:id", controller.getFolderShared);

router.post("/:id", controller.createFolder);
router.post("/:id/delete", controller.deleteFolder);
router.post("/:id/rename", controller.renameFolder);
router.post("/:id/share", controller.shareFolder);

module.exports = router;

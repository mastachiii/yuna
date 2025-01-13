const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const controller = require("../controller/fileController");
const auth = require("../helpers/authMiddleware");

const router = express.Router();

router.get("/:id", auth.isAuthenticated, controller.getFile);
router.get("/public/:id", controller.getFilePublic);

router.post("/", upload.single("file"), controller.addFile);
router.post("/:id/delete", controller.deleteFile);
router.post("/:id/rename", controller.renameFile);

module.exports = router;

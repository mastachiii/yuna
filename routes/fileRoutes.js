const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const controller = require("../controller/fileController");

const router = express.Router();

router.post("/", upload.single("file"), controller.addFile);

module.exports = router;

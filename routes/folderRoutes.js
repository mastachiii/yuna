const express = require("express");
const { Folder } = require("../model/queries");

const db = new Folder();

const router = express.Router();

// TODO: prob a get request would query db for single folder then render it...
// router.get('/')

router.post("/", async (req, res, next) => {
    try {
        await db.createFolder({ name: req.body.folder, ownerId: req.user.id });

        res.redirect("/");
    } catch (err) {

        next(err);
    }
});

module.exports = router;

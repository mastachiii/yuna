const { Folder } = require("../model/queries");

const db = new Folder();

async function getFolder(req, res, next) {
    try {
        const id = req.params.id;
        res.send("yes");
    } catch (err) {
        next(err);
    }
}

async function createFolder(req, res, next) {
    try {
        await db.createFolder({ name: req.body.folder, ownerId: req.user.id });

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createFolder,
    getFolder,
};

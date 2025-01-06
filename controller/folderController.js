const { Folder } = require("../model/queries");

const db = new Folder();

async function getFolder(req, res, next) {
    try {
        const folder = await db.getFolder(req.params.id);

        res.render("folder", { folder });
    } catch (err) {
        next(err);
    }
}

async function createFolder(req, res, next) {
    try {
        await db.createSubFolder({ name: req.body.folder, parentFolderId: req.params.id });

        res.redirect("");
    } catch (err) {
        next(err);
    }
}

async function deleteFolder(req, res, next) {
    try {
        await db.deleteFolder(req.body.id);

        res.redirect("back");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createFolder,
    getFolder,
    deleteFolder,
};

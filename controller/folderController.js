const { Folder, Link } = require("../model/queries");
const { v4: uuidv4 } = require("uuid");

const folderDb = new Folder();
const linkDb = new Link();

async function getFolder(req, res, next) {
    try {
        const folder = await folderDb.getFolder(req.params.id);

        res.render("folder", { folder });
    } catch (err) {
        next(err);
    }
}

async function createFolder(req, res, next) {
    try {
        await folderDb.createSubFolder({ name: req.body.folder, parentFolderId: req.params.id });

        res.redirect("");
    } catch (err) {
        next(err);
    }
}

async function deleteFolder(req, res, next) {
    try {
        await folderDb.deleteFolder(req.body.id);

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

async function renameFolder(req, res, next) {
    try {
        await folderDb.renameFolder(req.body);

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

async function shareFolder(req, res, next) {
    try {
        const url = `https://localhost:8080/share/${req.user.username}/${uuidv4()}`;

        console.log(req.body)

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createFolder,
    getFolder,
    deleteFolder,
    renameFolder,
    shareFolder,
};

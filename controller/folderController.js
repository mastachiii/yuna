const { Folder, Link } = require("../model/queries");
const { v4: uuidv4 } = require("uuid");
const getExpirationDate = require("../helpers/expirationDate");
const { authenticate } = require("passport");

const folderDb = new Folder();
const linkDb = new Link();

async function getFolder(req, res, next) {
    try {
        const folder = await folderDb.getFolder(req.params.id);

        res.render("folder", { folder, authenticated: true });
    } catch (err) {
        next(err);
    }
}

async function getPublicFolder(req, res, next) {
    try {
        if (!req.session.sharedUrl) res.redirect("/log-in");

        const folder = await folderDb.getFolder(req.params.id);

        res.render("folder", { folder, authenticated: false });
    } catch (err) {
        next(err);
    }
}

async function getFolderShared(req, res, next) {
    try {
        req.session.sharedUrl = `${req.headers.host}${req.originalUrl}`;

        const link = await linkDb.getLink(req.session.sharedUrl);
        console.log(link, req.session.sharedUrl);
        if (!link) {
            req.session.sharedUrl = "";

            return res.redirect("/");
        }

        if (new Date() > link.expirationDate) {
            await linkDb.deleteLink(req.session.sharedUrl);

            req.session.sharedUrl = "";

            return res.json("Link expired");
        }

        res.redirect(`/folders/public/${link.folderId}`);
    } catch (err) {
        next(err);
    }
}

async function createFolder(req, res, next) {
    try {
        if (!req.body.name) req.body.name = "New Folder";

        await folderDb.createSubFolder({ name: req.body.name, parentFolderId: req.params.id });

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
        const url = `yuna-production.up.railway.app/folders/share/${req.user.username}/${uuidv4()}`;
        const expirationDate = getExpirationDate(req.body.date);

        await linkDb.createLink({
            expirationDate,
            url,
            folderId: req.body.id,
        });

        res.render("share", { folderId: req.body.id, url, authenticated: true });
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
    getFolderShared,
    getPublicFolder,
};

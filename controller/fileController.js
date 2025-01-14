const { CreateClient, createClient } = require("@supabase/supabase-js");
const { decode } = require("base64-arraybuffer");
const { File } = require("../model/queries");
const { body, validationResult, check } = require("express-validator");
const getFileExtension = require("../helpers/getFileExt");
const { authenticate } = require("passport");
const { fi } = require("date-fns/locale");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
const db = new File();

async function addFile(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(401).send(errors.array());
        console.log(req);
        const file = decode(req.file.buffer.toString("base64"));
        const path = `${req.user.id}/${req.file.originalname}`;

        await supabase.storage.from("yuna").upload(path, file);

        const { data } = await supabase.storage.from("yuna").getPublicUrl(path);

        const size = req.file.size > 1000000 ? `${(req.file.size / 1000000).toFixed(2)} MB` : `${req.file.size / 1000} KB`;

        await db.addFile({
            name: req.file.originalname,
            size,
            extension: getFileExtension(req.file.originalname),
            parentFolderId: req.body.folder,
            url: data.publicUrl,
        });

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

async function getFile(req, res, next) {
    try {
        const file = await db.getFile(req.params.id);

        console.log(req.params)

        res.render("file", { file, authenticated: true });
    } catch (err) {
        next(err);
    }
}

async function getFilePublic(req, res, next) {
    try {
        if (!req.session.sharedUrl) res.redirect("/log-in");

        const file = await db.getFile(req.params.id);

        res.render("file", { file, authenticated: false });
    } catch (err) {
        next(err);
    }
}

async function deleteFile(req, res, next) {
    try {
        await db.deleteFile(req.body.id);

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

async function renameFile(req, res, next) {
    try {
        const file = await db.getFile(req.body.id);

        await db.renameFile({ id: req.body.id, name: `${req.body.name}${file.extension}` });

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addFile,
    getFile,
    deleteFile,
    renameFile,
    getFilePublic,
};

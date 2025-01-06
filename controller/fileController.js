const { CreateClient, createClient } = require("@supabase/supabase-js");
const { decode } = require("base64-arraybuffer");
const { File } = require("../model/queries");
const { body, validationResult, check } = require("express-validator");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
const db = new File();

const validateFile = [
    check("file")
        .notEmpty()
        .custom(value => {
            const UPLOAD_LIMIT = 50 * 1000000;

            console.log(value.size > UPLOAD_LIMIT);

            if (value.size > UPLOAD_LIMIT) throw new Error("File can't be larger than 50mb");
        }),
];

const addFile = [
    (req, res, next) => {
        req.body.file = req.file;

        next();
    },
    validateFile,
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) return res.status(401).send(errors.array());

            const file = decode(req.file.buffer.toString("base64"));
            const path = `${req.user.id}/${req.file.originalname}`;

            await supabase.storage.from("yuna").upload(path, file);

            const { data } = await supabase.storage.from("yuna").getPublicUrl(path);

            await db.addFile({
                name: req.file.originalname,
                parentFolderId: req.body.folder,
                url: data.publicUrl,
            });

            res.redirect("/");
        } catch (err) {
            next(err);
        }
    },
];

async function getFile(req, res, next) {
    try {
        const file = await db.getFile(req.params.id);

        res.render("file", { file });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addFile,
    getFile,
};

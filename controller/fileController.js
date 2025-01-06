const { CreateClient, createClient } = require("@supabase/supabase-js");
const { decode } = require("base64-arraybuffer");
const { File } = require("../model/queries");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
const db = new File();

async function addFile(req, res, next) {
    try {
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
}

module.exports = {
    addFile,
};

const { CreateClient, createClient } = require("@supabase/supabase-js");
const { decode } = require("base64-arraybuffer");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function addFile(req, res, next) {
    try {
        const file = decode(req.file.buffer.toString("base64"));

        console.log(req.file)

        await supabase.storage.from("yuna").upload(`${req.user.id}/${req.file.originalname}`, file);

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addFile,
};

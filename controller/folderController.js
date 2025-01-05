async function getFolder(req, res, next) {
    try {
        console.log(req.user)
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
    getFolder
};

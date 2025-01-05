function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/log-in");
    }
}

// For example, auth users trying to get into log in page would be instead redirected to the homepage....
function isNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    } else {
        next();
    }
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
};

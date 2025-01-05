function getLogInForm(req, res) {
    res.render("logIn");
}

function logInUser(req, res) {
    res.redirect("/");
}

module.exports = {
    getLogInForm,
    logInUser,
};

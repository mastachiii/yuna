function getLogInForm(req, res) {
    let error;

    if (req.session.messages) {
        error = req.session.messages[0];
        req.session.messages = []; // Clear out messages so it wont stack
    }

    if (req.user) res.redirect("/");

    res.render("logIn", { error });
}

function logInUser(req, res) {
    res.redirect("/");
}

module.exports = {
    getLogInForm,
    logInUser,
};

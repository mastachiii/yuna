// Takes in user input and adds it to the current date.

function expirationDate(expiresAt) {
    let expirationDate;

    switch (expiresAt) {
        case "1D":
            expirationDate = new Date(Date.now() + 8.64e7);
            break;

        case "10D":
            expirationDate = new Date(Date.now() + 8.64e8);
            break;

        case "1M":
            expirationDate = new Date(Date.now() + 2.628e9);
            break;

        case "1Y":
            expirationDate = new Date(Date.now() + 3.154e10);
            break;

        case "Forever":
            expirationDate = new Date("1/1/9999");
    }

    return expirationDate;
}

module.exports = expirationDate;

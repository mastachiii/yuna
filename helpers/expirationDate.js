// Takes in user input and adds it to the current date.

function expirationDate(expiresAt) {
    let expirationDate;

    switch (expiresAt) {
        case "1D":
            expirationDate = new Date(Date.now() + 8.64e7);
            break;

        case "10D":
            expirationDate = new Date(Date.now() + 8.64e+8)
    }
    console.log(expirationDate);
}

expirationDate("10D");

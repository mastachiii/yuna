function getFileExtension(filename) {
    return `.${filename.split('.').at(-1)}`
}

module.exports = getFileExtension
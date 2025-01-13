const { PrismaClient, Prisma } = require("@prisma/client");
const { format } = require("date-fns");
const { tr } = require("date-fns/locale");
const { use } = require("passport");

const prisma = new PrismaClient();

class User {
    async createUser({ username, password, email }) {
        await prisma.user.create({
            data: {
                username,
                password,
                email,
                rootFolder: {
                    create: {
                        name: username,
                        files: {},
                        subFolders: {},
                        date: format(new Date(), "Pp"),
                    },
                },
            },
        });
    }

    async getAllUsers() {
        const users = await prisma.user.findMany({
            include: {
                rootFolder: {
                    include: {
                        files: true,
                        subFolders: true,
                    },
                },
            },
        });

        console.dir(users, { depth: null });
    }

    async getUserById(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                rootFolder: true,
            },
        });

        return user;
    }

    async getUserByUsername(username) {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        return user;
    }

    async getUserByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    }
}

class Folder {
    async createFolder({ name, ownerId }) {
        await prisma.folder.create({
            data: {
                name,
                files: {},
                subFolders: {},
                owner: {
                    connect: {
                        id: ownerId,
                    },
                },
            },
        });
    }

    async createSubFolder({ name, parentFolderId, ownerId }) {
        await prisma.folder.create({
            data: {
                name,
                files: {},
                subFolders: {},
                parentFolder: {
                    connect: {
                        id: parentFolderId,
                    },
                },
                date: format(new Date(), "Pp"),
            },
        });
    }

    async getAllFolders() {
        const folders = await prisma.folder.findMany({
            include: {
                subFolders: true,
                files: true,
                owner: true,
            },
            orderBy: {
                date: "desc",
            },
        });
    }

    async getFolder(id) {
        const folder = await prisma.folder.findUnique({
            where: { id },
            include: {
                subFolders: {
                    orderBy: {
                        date: "desc",
                    },
                },
                parentFolder: true,
                files: {
                    orderBy: {
                        date: "desc",
                    },
                },
                owner: true,
            },
        });

        return folder;
    }

    async renameFolder({ id, name }) {
        await prisma.folder.update({
            where: { id },
            data: {
                name,
            },
        });
    }

    async deleteFolder(id) {
        await prisma.folder.delete({
            where: { id },
        });
    }
}

class File {
    async addFile({ name, url, size, extension, parentFolderId }) {
        await prisma.file.create({
            data: {
                name,
                url,
                size,
                extension,
                date: format(new Date(), "Pp"),
                addedTo: {
                    connect: {
                        id: parentFolderId,
                    },
                },
            },
        });
    }

    async getFile(id) {
        const file = await prisma.file.findUnique({
            where: { id },
            include: {
                addedTo: true,
            },
        });

        return file;
    }

    async getAllFiles() {
        const files = await prisma.file.findMany();

        console.log(files);
    }

    async renameFile({ id, name }) {
        await prisma.file.update({
            where: { id },
            data: {
                name,
            },
        });
    }

    async deleteFile(id) {
        await prisma.file.delete({
            where: { id },
        });
    }
}

class Link {
    // Set default values for folder & files as skip since user can only exclusively share a folder or a file.
    async createLink({ expirationDate, folderId = Prisma.skip, fileId = Prisma.skip, url }) {
        await prisma.link.create({
            data: {
                url,
                expirationDate,
                fileId,
                folderId,
            },
        });
    }

    async getLink(url) {
        const contents = await prisma.link.findUnique({
            where: { url },
        });

        return contents;
    }

    async deleteLink(url) {
        await prisma.link.delete({ where: { url } });
    }
}

module.exports = {
    User,
    Folder,
    File,
    Link,
};

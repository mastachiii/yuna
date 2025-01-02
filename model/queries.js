const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class User {
    async createUser({ username, password, email }) {
        await prisma.user.create({
            data: {
                username,
                password,
                email,
                folders: {},
                files: {},
            },
        });
    }

    async getAllUsers() {
        const users = await prisma.user.findMany({
            include: {
                rootFolders: {
                    include: {
                        files: true,
                        subFolders: true,
                    },
                },
                files: true,
            },
        });

        console.dir(users, { depth: null });
    }

    async getUser(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                rootFolders: {
                    include: {
                        files: true,
                        subFolders: true,
                    },
                },
                files: true,
            },
        });

        console.dir(user, { depth: null });
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

    async createSubFolder({ name, parentFolderId }) {
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
        });

        console.log(folders);
    }

    async getFolder(id) {
        const folder = await prisma.folder.findUnique({
            where: { id },
            include: {
                subFolders: true,
                files: true,
                owner: true,
            },
        });

        console.log(folder);
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
    async addFile({ name, ownerId, parentFolderId }) {
        await prisma.file.create({
            data: {
                name,
                addedTo: {
                    connect: {
                        id: parentFolderId,
                    },
                },
                owner: {
                    connect: {
                        id: ownerId,
                    },
                },
            },
        });
    }

    async getFile(id) {
        const file = await prisma.file.findUnique({
            where: { id },
        });

        console.log(file);
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

const users = new User();
const folders = new Folder();
const files = new File();

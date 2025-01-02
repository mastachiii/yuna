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

    async deleteFile(id) {
        await prisma.file.delete({
            where: { id },
        });
    }
}

const users = new User();
const folders = new Folder();
const files = new File();

// files.addFile({ name: "app.js", ownerId: "94074629-1042-41c3-8664-b3dafa0c771a", parentFolderId: '1ee45d37-277d-442c-b9f7-5310af229d91' });

// users.getAllUsers();
// files.deleteFile("24293451-653a-4ce9-920b-f9cbf9819f00");
folders.getFolder("1ee45d37-277d-442c-b9f7-5310af229d91");
// users.getUser("94074629-1042-41c3-8664-b3dafa0c771a");

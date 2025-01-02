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
                rootFolders: true,
                files: true,
            },
        });

        console.log(users);
    }

    async getUser(email) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                rootFolders: {
                    include: {
                        subFolders: true,
                    },
                },
                files: true,
            },
        });

        console.log(user);
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

    async deleteFolder(id) {
        await prisma.folder.delete({
            where: { id },
        });
    }
}

const users = new User();
const folders = new Folder();

// folders.createFolder({ name: "mastachii-main", ownerId: "94074629-1042-41c3-8664-b3dafa0c771a" });
// folders.createFolder({ name: "breezy_786-main", ownerId: "65f02d12-bc54-4c6d-87df-406556757cc8" });
// folders.createFolder({ name: "hasenborg-main", ownerId: "09ed2380-64bb-4fc7-8aac-17622ccabab4" });

// folders.createSubFolder({ name: "mastachii-sub", parentFolderId: "c5a10b4c-5026-4c15-9b64-01fcda93b72d" });
// folders.createSubFolder({ name: "breezy-sub", parentFolderId: "18fd5f4b-2fdd-4f4e-aadf-fb3bb0ab3a03" });
// folders.createSubFolder({ name: "hasenborg-sub", parentFolderId: "54195e15-4183-428f-8394-29c1cc16f7a3" });

// users.getAllUsers();
// folders.getAllFolders();
// users.getUser("mastachii273@gmail.com");

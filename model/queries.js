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
                folders: true,
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

    async createSubFolder({ name, ownerId, parentFolderId }) {
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
                owner: {
                    connect: {
                        id: ownerId,
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

// folders.createSubFolder({
//     name: "mastachii-sub",
//     ownerId: "94074629-1042-41c3-8664-b3dafa0c771a",
//     parentFolderId: "bc277d5d-436a-42cc-bbba-70982dc013bc",
// });

// folders.createSubFolder({
//     name: "hasenborg-sub",
//     ownerId: "09ed2380-64bb-4fc7-8aac-17622ccabab4",
//     parentFolderId: "8ff1e00b-56a5-4f73-ace2-2a6e5c9fcd86",
// });

// folders.createSubFolder({
//     name: "breezy_786-sub",
//     ownerId: "65f02d12-bc54-4c6d-87df-406556757cc8",
//     parentFolderId: "25c1301a-d6ae-4b29-8185-56535ca29e0a",
// });

folders.deleteFolder("fce4de2b-e819-4334-a211-76ec6f309807");
folders.getAllFolders();
// users.getUser("mastachii273@gmail.com");

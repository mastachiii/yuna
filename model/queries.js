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
        const users = await prisma.user.findMany({});

        console.log(users);
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

    async getAllFolders() {
        const folders = await prisma.folder.findMany({
            include: {
                subFolders: true,
                files: true,
            },
        });

        console.log(folders);
    }
}

const users = new User();
const folders = new Folder();

// folders.createFolder({ name: "mastachii-main", ownerId: "94074629-1042-41c3-8664-b3dafa0c771a" });
// folders.createFolder({ name: "hasenborg-main", ownerId: "09ed2380-64bb-4fc7-8aac-17622ccabab4" });
// folders.createFolder({ name: "breezy_786-main", ownerId: "65f02d12-bc54-4c6d-87df-406556757cc8" });

folders.getAllFolders();

// user.getAllUsers();

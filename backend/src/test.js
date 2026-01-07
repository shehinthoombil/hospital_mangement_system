const prisma = require("./prisma")

async function test() {
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@gmail.com",
            password: "hashedpassword",
            role: "USER"
        }
    })

    console.log(user)
}

test()

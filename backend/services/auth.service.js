const bcrypt = require("bcrypt")
const prisma = require("../prisma")
const { generateToken } = require("../utils/jwt")
//register
const register = async ({ name, email, password, role }) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        throw new Error("Email already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
        },
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
}
//login
const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user || user.isDeleted) {
        throw new Error("Invalid credentials")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Invalid credentials")
    }

    const token = generateToken({
        userId: user.id,
        role: user.role,
    })

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    }
}

module.exports = {
    register,
    login,
}

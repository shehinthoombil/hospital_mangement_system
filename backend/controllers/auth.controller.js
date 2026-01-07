const authService = require("../services/auth.service")
//register(request/response)
const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await authService.register({
            name,
            email,
            password,
            role,
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        })
    } catch (error) {
        next(error)
    }
}

//login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }

        const result = await authService.login({ email, password })

        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
}

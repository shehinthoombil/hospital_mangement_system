const express = require("express")
const cors = require("cors")
require("dotenv").config()
const authRoutes = require("./routes/auth.routes")

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Server is running" })
})
//temporary test route to ensure Prisma works inside Express
const prisma = require("./prisma")

app.get("/test-db", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        next(error)
    }
})

//connecting auth routes to app
app.use("/auth", authRoutes)

// Global error handler
app.use((err, req, res, next) => {
    console.error(err)

    const status = err.statusCode || 500
    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
    })
})

module.exports = app

const express = require("express")
const router = express.Router()

const authenticate = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/role.middleware")
const controller = require("../controllers/appointment.controller")

router.use(authenticate)
//role based controlling

// USER
router.post("/", authorize(["USER"]), controller.createAppointment)
router.get("/my", authorize(["USER"]), controller.listUserAppointments)

// ADMIN
router.post("/assign", authorize(["ADMIN"]), controller.assignDoctor)
router.get("/all", authorize(["ADMIN"]), controller.listAllAppointments)

// DOCTOR
router.get("/assigned", authorize(["DOCTOR"]), controller.listDoctorAppointments)
router.patch("/:id/confirm", authorize(["DOCTOR"]), controller.confirmAppointment)
router.patch("/:id/complete", authorize(["DOCTOR"]), controller.completeAppointment)

// USER + ADMIN
router.patch("/:id/cancel", authorize(["USER", "ADMIN"]), controller.cancelAppointment)

module.exports = router

//role based access control
const express = require("express")
const router = express.Router()

const authenticate = require("../middlewares/auth.middleware")
const authorize = require("../middlewares/role.middleware")
const controller = require("../controllers/case.controller")

router.use(authenticate)

// DOCTOR
router.post("/", authorize(["DOCTOR"]), controller.createCase)//create case
router.get("/doctor", authorize(["DOCTOR"]), controller.listDoctorCases)//list assigned case
router.patch("/:caseId/status", authorize(["DOCTOR"]), controller.updateCaseStatus)//doctor only update

// USER
router.get("/my", authorize(["USER"]), controller.listUserCases)//user case only list

// ADMIN
router.get("/all", authorize(["ADMIN"]), controller.listAllCases)//list all cases for admin

module.exports = router

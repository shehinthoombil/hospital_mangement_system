const service = require("../services/appointment.service")
//appointment controller HTTP
//create appointment
const createAppointment = async (req, res, next) => {
    try {
        const { appointmentDate } = req.body
        const appointment = await service.createAppointment(
            req.user.userId,
            appointmentDate
        )
        res.status(201).json(appointment)
    } catch (e) {
        next(e)
    }
}
//assigning to doctor
const assignDoctor = async (req, res, next) => {
    try {
        const { appointmentId, doctorId } = req.body
        const appointment = await service.assignDoctor(appointmentId, doctorId)
        res.json(appointment)
    } catch (e) {
        next(e)
    }
}

const confirmAppointment = async (req, res, next) => {
    try {
        const appointment = await service.confirmAppointment(
            req.params.id,
            req.user.userId
        )
        res.json(appointment)
    } catch (e) {
        next(e)
    }
}

const completeAppointment = async (req, res, next) => {
    try {
        const appointment = await service.completeAppointment(
            req.params.id,
            req.user.userId
        )
        res.json(appointment)
    } catch (e) {
        next(e)
    }
}

const cancelAppointment = async (req, res, next) => {
    try {
        const appointment = await service.cancelAppointment(req.params.id)
        res.json(appointment)
    } catch (e) {
        next(e)
    }
}

const listUserAppointments = async (req, res, next) => {
    try {
        const data = await service.listUserAppointments(req.user.userId)
        res.json(data)
    } catch (e) {
        next(e)
    }
}

const listDoctorAppointments = async (req, res, next) => {
    try {
        const data = await service.listDoctorAppointments(req.user.userId)
        res.json(data)
    } catch (e) {
        next(e)
    }
}

const listAllAppointments = async (req, res, next) => {
    try {
        const data = await service.listAllAppointments()
        res.json(data)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    createAppointment,
    assignDoctor,
    confirmAppointment,
    completeAppointment,
    cancelAppointment,
    listUserAppointments,
    listDoctorAppointments,
    listAllAppointments,
}

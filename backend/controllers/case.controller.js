const service = require("../services/case.service")

const createCase = async (req, res, next) => {
    try {
        const { appointmentId, description } = req.body

        const medicalCase = await service.createCase(
            req.user.userId,
            appointmentId,
            description
        )

        res.status(201).json(medicalCase)
    } catch (e) {
        next(e)
    }
}

const listDoctorCases = async (req, res, next) => {
    try {
        const cases = await service.listDoctorCases(req.user.userId)
        res.json(cases)
    } catch (e) {
        next(e)
    }
}

const listUserCases = async (req, res, next) => {
    try {
        const cases = await service.listUserCases(req.user.userId)
        res.json(cases)
    } catch (e) {
        next(e)
    }
}

const listAllCases = async (req, res, next) => {
    try {
        const cases = await service.listAllCases()
        res.json(cases)
    } catch (e) {
        next(e)
    }
}

const updateCaseStatus = async (req, res, next) => {
    try {
        const { caseId } = req.params
        const { status } = req.body

        const updatedCase = await service.updateCaseStatus(
            caseId,
            req.user.userId,
            status
        )

        res.json(updatedCase)
    } catch (e) {
        next(e)
    }
}


module.exports = {
    createCase,
    listDoctorCases,
    listUserCases,
    listAllCases,
    updateCaseStatus,
}

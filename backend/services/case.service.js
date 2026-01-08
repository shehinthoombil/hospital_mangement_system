const prisma = require("../prisma")
const AppError = require("../utils/AppError")

//all critical rules like cases assuring
const createCase = async (
    doctorId,
    appointmentId,
    description
) => {
    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
    })

    if (!appointment) {
        throw new Error("Appointment not found")
    }

    if (appointment.status !== "CONFIRMED") {
        throw new Error("Case can be created only for CONFIRMED appointments")
    }

    if (appointment.assignedDoctorId !== doctorId) {
        throw new Error("You are not assigned to this appointment")
    }
    // avoid duplicate case creation
    const existingCase = await prisma.case.findUnique({
        where: { appointmentId },
    })

    if (existingCase) {
        throw new Error("Case already exists for this appointment")
    }

    return prisma.case.create({
        data: {
            description,
            appointmentId,
            userId: appointment.createdByUserId,
            doctorId,
        },
    })
}

const listDoctorCases = async (doctorId) => {
    return prisma.case.findMany({
        where: { doctorId },
        include: {
            user: true,
            appointment: true,
        },
    })
}

const listUserCases = async (userId) => {
    return prisma.case.findMany({
        where: { userId },
        include: {
            doctor: true,
            appointment: true,
        },
    })
}

const listAllCases = async () => {
    return prisma.case.findMany({
        include: {
            user: true,
            doctor: true,
            appointment: true,
        },
    })
}
//updating case status
const updateCaseStatus = async (caseId, doctorId, newStatus) => {
    const medicalCase = await prisma.case.findUnique({
        where: { id: caseId },
    })

    if (!medicalCase) {
        throw new AppError("Case not found", 404)
    }

    if (medicalCase.doctorId !== doctorId) {
        throw new Error("You are not assigned to this case")
    }

    const validTransitions = {
        OPEN: ["IN_PROGRESS"],
        IN_PROGRESS: ["RESOLVED"],
        RESOLVED: ["CLOSED"],
        CLOSED: [],
    }

    const allowedStatuses = validTransitions[medicalCase.status]

    if (!allowedStatuses.includes(newStatus)) {
        throw new Error(
            `Invalid status transition from ${medicalCase.status} to ${newStatus}`
        )
    }

    return prisma.case.update({
        where: { id: caseId },
        data: { status: newStatus },
    })
}


module.exports = {
    createCase,
    listDoctorCases,
    listUserCases,
    listAllCases,
    updateCaseStatus,
}

const prisma = require("../prisma")
//appointment service
// USER creates appointment
const createAppointment = async (userId, appointmentDate) => {
  return prisma.appointment.create({
    data: {
      appointmentDate: new Date(appointmentDate),
      createdByUserId: userId,
    },
  })
}

// ADMIN assigns doctor
const assignDoctor = async (appointmentId, doctorId) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  })

  if (!appointment || appointment.isDeleted) {
    throw new Error("Appointment not found")
  }

  if (appointment.status !== "CREATED") {
    throw new Error("Doctor can be assigned only to CREATED appointments")
  }

  return prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      assignedDoctorId: doctorId,
      status: "ASSIGNED",
    },
  })
}

// DOCTOR confirms appointment
const confirmAppointment = async (appointmentId, doctorId) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  })

  if (!appointment) throw new Error("Appointment not found")

  if (appointment.assignedDoctorId !== doctorId) {
    throw new Error("You are not assigned to this appointment")
  }

  if (appointment.status !== "ASSIGNED") {
    throw new Error("Only ASSIGNED appointments can be confirmed")
  }

  return prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CONFIRMED" },
  })
}

// DOCTOR completes appointment
const completeAppointment = async (appointmentId, doctorId) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  })

  if (!appointment) throw new Error("Appointment not found")

  if (appointment.assignedDoctorId !== doctorId) {
    throw new Error("You are not assigned to this appointment")
  }

  if (appointment.status !== "CONFIRMED") {
    throw new Error("Only CONFIRMED appointments can be completed")
  }

  return prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "COMPLETED" },
  })
}

// USER or ADMIN cancels appointment
const cancelAppointment = async (appointmentId) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  })

  if (!appointment) throw new Error("Appointment not found")

  if (appointment.status === "COMPLETED") {
    throw new Error("Completed appointments cannot be cancelled")
  }

  return prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CANCELLED" },
  })
}

// LISTS user
const listUserAppointments = async (userId) => {
  return prisma.appointment.findMany({
    where: {
      createdByUserId: userId,
      isDeleted: false,
    },
    include: {
      assignedDoctor: true,
    },
  })
}
//list doctor
const listDoctorAppointments = async (doctorId) => {
  return prisma.appointment.findMany({
    where: {
      assignedDoctorId: doctorId,
      isDeleted: false,
    },
    include: {
      createdByUser: true,
    },
  })
}
//list all for admin
const listAllAppointments = async () => {
  return prisma.appointment.findMany({
    where: { isDeleted: false },
    include: {
      createdByUser: true,
      assignedDoctor: true,
    },
  })
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

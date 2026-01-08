import api from "../api/axios"

export const getMyAppointments = () =>
    api.get("/appointments/my")

export const createAppointment = (data) =>
    api.post("/appointments", data)

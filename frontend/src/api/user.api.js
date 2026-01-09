import api from "./axios";

export const createAppointment = (data) =>
    api.post("/appointments", data);

export const getMyAppointments = () =>
    api.get("/appointments/my");

export const cancelAppointment = (id) =>
    api.patch(`/appointments/${id}/cancel`);
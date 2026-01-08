import api from "./axios";

export const getAssignedAppointments = () =>
    api.get("/appointments/doctor");

export const updateAppointmentStatus = (id, status) =>
    api.patch(`/appointments/${id}/status`, { status });

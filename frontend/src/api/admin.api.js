import api from "./axios";

export const getAllAppointments = () =>
    api.get("/appointments");

export const assignDoctor = (appointmentId, doctorId) =>
    api.patch(`/appointments/${appointmentId}/assign`, {
        doctorId,
    });

export const getAllCases = () =>
    api.get("/cases");

export const createCaseAdmin = (data) =>
    api.post("/cases/admin", data);

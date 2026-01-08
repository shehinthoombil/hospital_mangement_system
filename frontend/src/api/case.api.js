import api from "./axios";

export const getDoctorCases = () =>
    api.get("/cases/doctor");

export const createCase = (data) =>
    api.post("/cases", data);

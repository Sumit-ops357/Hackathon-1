import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

export const bookAppointment = async (token, doctorId, date) => {
  return axios.post(
    `${API_URL}/book`,
    { doctorId, date },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getAppointments = async (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const rescheduleAppointment = async (token, appointmentId, date) => {
  return axios.put(
    `${API_URL}/reschedule/${appointmentId}`,
    { date },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const cancelAppointment = async (token, appointmentId) => {
  return axios.delete(`${API_URL}/cancel/${appointmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

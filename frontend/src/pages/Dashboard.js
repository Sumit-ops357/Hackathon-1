import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAppointments,
  bookAppointment,
  cancelAppointment,
} from "../services/appointmentService";
import {
  getAvailability,
  setAvailability,
  removeAvailability,
} from "../services/doctorService";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");

  useEffect(() => {
    if (user.role === "patient") {
      loadAppointments();
    } else if (user.role === "doctor") {
      loadAvailability();
    }
  }, [user]);

  // Load patient appointments
  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
  };

  // Load doctor availability
  const loadAvailability = async () => {
    try {
      const data = await getAvailability(user.id);
      setAvailableSlots(data);
    } catch (error) {
      console.error("Error loading availability:", error);
    }
  };

  // Book an appointment (Patient)
  const handleBookAppointment = async (doctorId, date) => {
    try {
      await bookAppointment({ doctorId, date });
      alert("Appointment booked successfully!");
      loadAppointments();
    } catch (error) {
      alert("Error booking appointment. Try again.");
    }
  };

  // Cancel an appointment (Patient)
  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      alert("Appointment canceled successfully!");
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
    } catch (error) {
      alert("Error canceling appointment. Try again.");
    }
  };

  // Add a new availability slot (Doctor)
  const handleAddAvailability = async () => {
    if (!newSlot) return alert("Please select a date and time.");
    try {
      await setAvailability({ availableSlots: [...availableSlots, newSlot] });
      setAvailableSlots([...availableSlots, newSlot]);
      setNewSlot("");
      alert("Availability updated!");
    } catch (error) {
      alert("Error updating availability. Try again.");
    }
  };

  // Remove an availability slot (Doctor)
  const handleRemoveAvailability = async (slot) => {
    try {
      await removeAvailability(slot);
      setAvailableSlots(availableSlots.filter((s) => s !== slot));
      alert("Availability slot removed.");
    } catch (error) {
      alert("Error removing availability. Try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>

      {user.role === "patient" ? (
        <div>
          <h3 className="text-xl font-semibold mb-3">My Appointments</h3>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <div key={appt._id} className="p-4 border rounded mb-2">
                <p>
                  <strong>Doctor:</strong> {appt.doctor.name}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(appt.date).toLocaleString()}
                </p>
                <button
                  onClick={() => handleCancelAppointment(appt._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Cancel
                </button>
              </div>
            ))
          ) : (
            <p>No appointments booked yet.</p>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-3">My Availability</h3>
          <ul>
            {availableSlots.map((slot, index) => (
              <li key={index} className="p-2 border rounded mb-1 flex justify-between">
                {new Date(slot).toLocaleString()}
                <button
                  onClick={() => handleRemoveAvailability(slot)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <input
            type="datetime-local"
            value={newSlot}
            onChange={(e) => setNewSlot(e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
          <button
            onClick={handleAddAvailability}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            Add Availability
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

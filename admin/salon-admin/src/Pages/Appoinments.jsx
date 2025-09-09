import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import { io } from "socket.io-client";
import { FaTrash } from "react-icons/fa";

const socket = io("http://206.189.130.102:5001");

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    fetch("http://206.189.130.102:5001/api/v1/admin/appointments/get-appointments")
      .then(res => res.json())
      .then(data => {
        const list = data.appointments || data.data?.appointments || [];
        if (list.length > 0) {
          const sorted = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAppointments(sorted);
        } else {
          setAppointments([]);
        }
      })
      .catch(err => console.error("Error fetching appointments:", err));
  };

  useEffect(() => {
    // Fetch initial data
    fetchAppointments();

    // ✅ Listen for new appointments in real-time
    socket.on("newAppointment", (newApp) => {
      console.log("📢 New Appointment Received:", newApp);
      setAppointments((prev) => [newApp, ...prev]); // prepend new appointment
    });

    return () => {
      socket.off("newAppointment");
    };
  }, []);

 // ✅ Delete appointment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const res = await fetch(`http://206.189.130.102:5001/api/v1/admin/appointments/delete-appointment/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error deleting appointment");

      // Remove from state
      setAppointments(prev => prev.filter(app => app._id !== id));
      alert("Appointment deleted successfully ✅");
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert(err.message);
    }
  };

  // ✅ Format date
  const formatDate = (dateStr, timeStr) => {
    const today = new Date();
    const date = new Date(dateStr);

    const todayStr = today.toDateString();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (date.toDateString() === todayStr) {
      return timeStr;
    } else if (date.toDateString() === yesterdayStr) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    }
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="appoinment-page">
          <div className="page__full-wrapper">
            <Sidebar />
            <div className="page__body-wrapper">
              <Header />

              <div className="app__slide-wrapper">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="breadcrumb__wrapper mb-35">
                      <div className="breadcrumb__inner">
                        <div className="breadcrumb__icon">
                          <i className="flaticon-home"></i>
                        </div>
                        <div className="breadcrumb__menu">
                          <nav>
                            <ul>
                              <li>
                                <span><Link to="/dashboard">Home</Link></span>
                              </li>
                              <li className="active"><span>Appointments</span></li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tables */}
                <div className="row g-20">
                  {appointments.length > 0 ? (
                    appointments.map(app => (
                      <div key={app._id} className="col-xl-3 col-lg-6 col-md-6">
                        <Link>
                          <div className="Expovent__count-item mb-20 hover-card">
                            <div
                              className="Expovent__count-thumb include__bg transition-3"
                              style={{
                                backgroundImage: `url(assets/img/bg/count-bg.png)`
                              }}
                            ></div>
                            <div className="Expovent__count-content w-100">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <h4 className="card-title fw-bold">{app.name}</h4>
                                <h6 className="text-muted">
                                  {formatDate(app.date, app.time)}
                                </h6>
                              </div>
                              <p className="card-text mb-1">
                                <strong>Services:</strong>{" "}
                                {app.serviceIds?.length > 0
                                  ? app.serviceIds.map(s => s?.name || "N/A").join(", ")
                                  : "N/A"}
                              </p>
                              <p className="card-text mb-1">
                                <strong>Barber:</strong> {app.barberId?.name || "N/A"}
                              </p>
                              <p className="card-text mb-0">
                                <strong>Time:</strong> {app.time}
                              </p>
                              <p className="card-text mb-0">
                                <strong>Mobile:</strong> {app.mobile}
                              </p>
                              <p className="card-text mb-0">
                                <strong>Status:</strong> {app.status}
                              </p>
                                {/* ✅ Delete button */}
                            <button
                              onClick={() => handleDelete(app._id)}
                              className="btn btn-sm btn-danger mt-2"
                            >
                              <FaTrash /> Delete
                            </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p>No appointments found.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;

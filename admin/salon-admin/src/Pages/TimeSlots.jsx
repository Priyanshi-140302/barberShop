import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaPlus } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

const TimeSlots = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedBarber, setSelectedBarber] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ New modal states
  const [slotModal, setSlotModal] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [slots, setSlots] = useState([{ start: "", end: "" }]);

  // ✅ Fetch all barbers
  const getBarbers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://206.189.130.102:5001/api/v1/admin/barbers/all-barbers");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setBarbers(result.barbers || []);
    } catch (error) {
      console.error("Error fetching barbers:", error.message);
      toast.error("Failed to fetch barbers!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBarbers();
  }, []);

  // ✅ View slots modal
  const handleBarberClick = (barber) => {
    setSelectedBarber(barber);
    setShowModal(true);
  };

  // ✅ Manage slots modal
  const handleManageSlots = (barber) => {
    setSelectedBarber(barber);
    setSlotModal(true);
    setSlotDate("");
    setSlots([{ start: "", end: "" }]);
  };

  // ✅ Save slots
  const handleSaveSlots = async () => {
    if (!slotDate) {
      toast.error("Please select a date!");
      return;
    }

    try {
      const response = await fetch("http://206.189.130.102:5001/api/v1/admin/barbers/set-barber-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barberId: selectedBarber._id,
          date: slotDate,
          slots: slots.filter((s) => s.start && s.end),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Slots updated!");
        setSlotModal(false);
        getBarbers();
      } else {
        toast.error(result.message || "Failed to update slots");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container-fluid p-0">
      <ToastContainer limit={1} position="top-right" autoClose={3000} />
      <div className="dashboard-page">
        <div className="page__full-wrapper">
          <Sidebar />
          <div className="page__body-wrapper">
            <Header />

            <div className="app__slide-wrapper">
              {/* Breadcrumb */}
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
                              <span>
                                <Link to="/dashboard">Home</Link>
                              </span>
                            </li>
                            <li className="active">
                              <span>Agents</span>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barbers Table Card */}
              <div className="row g-20">
                <div className="col-xl-12">
                  <div className="card__wrapper">
                    <div className="card__header d-flex justify-content-between align-items-center">
                      <h4>Agents List</h4>
                    </div>
                    <div
                      className="card-body scroll-w-1 card__scroll overflow-auto"
                      style={{ maxHeight: "500px" }}
                    >
                      {loading ? (
                        <div className="text-center py-3">
                          <div className="spinner-border text-dark" role="status"></div>
                        </div>
                      ) : (
                        <table className="table table-hover mt-3">
                          <thead className="table-warning">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Experience</th>
                              <th>Specialization</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {barbers.length > 0 ? (
                              barbers.map((barber, index) => (
                                <tr key={barber._id}>
                                  <td>{index + 1}</td>
                                  <td>{barber.name}</td>
                                  <td>{barber.experience} yrs</td>
                                  <td>{barber.specialization}</td>
                                  <td>{barber.phone}</td>
                                  <td>{barber.email}</td>
                                  <td>
                                    <button
                                      className="btn btn-sm btn-outline-info me-2"
                                      onClick={() => handleBarberClick(barber)}
                                    >
                                      <FaEye/>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-outline-primary"
                                      onClick={() => handleManageSlots(barber)}
                                    >
                                   <FaPlus/>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="text-center">
                                  No Agents found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Barber Slots Modal */}
      {showModal && selectedBarber && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedBarber.name} - Time Slots</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {selectedBarber.timeSlots && selectedBarber.timeSlots.length > 0 ? (
                  <table className="table table-bordered">
                    <thead className="table-secondary">
                      <tr>
                        <th>Date</th>
                        <th>Slots</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBarber.timeSlots.map((day) => (
                        <tr key={day._id || day.date}>
                          <td>{day.date}</td>
                          <td>
                            {day.slots.map((slot, i) => (
                              <span key={i} className="badge bg-primary me-2">
                                {slot.start} - {slot.end}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No time slots available for this agent.</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Slots Modal */}
      {slotModal && selectedBarber && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Manage Slots - {selectedBarber.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSlotModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={slotDate}
                    onChange={(e) => setSlotDate(e.target.value)}
                  />
                </div>

                <h6>Time Slots</h6>
                {slots.map((slot, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="time"
                      className="form-control me-2"
                      value={slot.start}
                      onChange={(e) => {
                        const updated = [...slots];
                        updated[index].start = e.target.value;
                        setSlots(updated);
                      }}
                    />
                    <input
                      type="time"
                      className="form-control me-2"
                      value={slot.end}
                      onChange={(e) => {
                        const updated = [...slots];
                        updated[index].end = e.target.value;
                        setSlots(updated);
                      }}
                    />
                    {slots.length > 1 && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setSlots(slots.filter((_, i) => i !== index))}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => setSlots([...slots, { start: "", end: "" }])}
                >
                  + Add Slot
                </button>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSlotModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveSlots}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;

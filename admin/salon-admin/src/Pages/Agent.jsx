import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Agent = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    name: "",
    experience: "",
    specialization: "",
    phone: "",
    email: "",
    timeSlots: [
      {
        date: "",
        slots: [{ start: "", end: "" }],
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Get All Barbers
  const getBarbers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://206.189.130.102:5001/api/v1/admin/barbers/all-barbers"
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setBarbers(result.barbers || result || []);
    } catch (error) {
      console.error("Error fetching barbers:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBarbers();
  }, []);

  // ✅ Handle basic input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle timeSlots input
  const handleTimeSlotChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.timeSlots];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, timeSlots: updated };
    });
  };

  // ✅ Handle handleSlotChange input
  const handleSlotChange = (tsIndex, slotIndex, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.timeSlots];
      const slots = [...updated[tsIndex].slots];
      slots[slotIndex] = { ...slots[slotIndex], [field]: value };
      updated[tsIndex] = { ...updated[tsIndex], slots };
      return { ...prev, timeSlots: updated };
    });
  };


  const addTimeSlot = () => {
    setFormData({
      ...formData,
      timeSlots: [...formData.timeSlots, { date: "", slots: [{ start: "", end: "" }] }],
    });
  };

  const removeTimeSlot = (index) => {
    const slotsCopy = [...formData.timeSlots];
    slotsCopy.splice(index, 1);
    setFormData({ ...formData, timeSlots: slotsCopy });
  };

  const addSlot = (tsIndex) => {
    const timeSlotsCopy = [...formData.timeSlots];
    timeSlotsCopy[tsIndex].slots.push({ start: "", end: "" });
    setFormData({ ...formData, timeSlots: timeSlotsCopy });
  };

  const removeSlot = (tsIndex, slotIndex) => {
    const timeSlotsCopy = [...formData.timeSlots];
    timeSlotsCopy[tsIndex].slots.splice(slotIndex, 1);
    setFormData({ ...formData, timeSlots: timeSlotsCopy });
  };

  // ✅ Add Barber
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      const response = await fetch(
        "http://206.189.130.102:5001/api/v1/admin/barbers/create-barber",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Error creating barber");

      toast.success("Barber added successfully!");
      setShowAddModal(false);
      setFormData(initialFormData);
      getBarbers();
    } catch (error) {
      toast.error("Failed to create barber!");
      console.error(error);
    }
  };

  // ✅ Edit Barber
  const handleEdit = (barber) => {
    setSelectedBarber(barber);

    // Normalize timeSlots
    const normalizedTimeSlots = (barber.timeSlots || []).map((ts) => ({
      date: ts.date || "", // fallback if missing
      slots: (ts.slots && ts.slots.length ? ts.slots : [{ start: "", end: "" }]).map(
        (s) => ({
          start: s.start || "",
          end: s.end || "",
        })
      ),
    }));

    setFormData({
      ...barber,
      timeSlots: normalizedTimeSlots.length ? normalizedTimeSlots : [{ date: "", slots: [{ start: "", end: "" }] }],
    });

    setShowEditModal(true);
  };



  const handleUpdate = async () => {
    try {
      const payload = { ...formData };
      const response = await fetch(
        `http://206.189.130.102:5001/api/v1/admin/barbers/update-barber/${selectedBarber._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) throw new Error("Error updating barber");

      toast.success("Barber updated successfully!");
      setShowEditModal(false);
      getBarbers();
    } catch (error) {
      toast.error("Error updating barber");
      console.error(error);
    }
  };

  // ✅ Delete Barber
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this barber?")) return;
    try {
      const response = await fetch(
        `http://206.189.130.102:5001/api/v1/admin/barbers/delete-barber/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error deleting barber");

      toast.success("Barber deleted!");
      getBarbers();
    } catch (error) {
      toast.error("Error deleting barber");
      console.error(error);
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

            {/* Breadcrumb */}
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

              {/* Barbers Table */}
              <div className="row g-20">
                <div className="col-xl-12">
                  <div className="card__wrapper">
                    <div className="card__header d-flex justify-content-between align-items-center">
                      <h4>Agent List</h4>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => setShowAddModal(true)}
                      >
                        <i className="fa-solid fa-circle-plus me-2"></i>Add Agent
                      </button>
                    </div>
                    <div
                      className="card-body scroll-w-1 card__scroll overflow-auto"
                      style={{ maxHeight: "600px" }}
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
                              <th>Time Slots</th>
                              <th>Action</th>
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
                                    {barber.timeSlots && barber.timeSlots.length > 0 ? (
                                      <>
                                        {/* First date+slot */}
                                        {`${barber.timeSlots[0].date}: ${barber.timeSlots[0].slots
                                          .map(s => `${s.start}-${s.end}`)
                                          .join(", ")}`}
                                        {/* If more than 1 timeslot, show --- */}
                                        {barber.timeSlots.length > 1 && " | ---"}
                                      </>
                                    ) : (
                                      "---"
                                    )}
                                  </td>

                                  <td>
                                    <button
                                      className="btn btn-warning text-white rounded-5 me-2"
                                      onClick={() => handleEdit(barber)}
                                    >
                                      Edit <i className="fa-solid fa-pen ms-1"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger rounded-5"
                                      onClick={() => handleDelete(barber._id)}
                                    >
                                      Delete <i className="fa-solid fa-trash-can ms-1"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  No agents found
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

              {/* Add/Edit Modal */}
              {(showAddModal || showEditModal) && (
                <div className="modal show d-block" tabIndex="-1">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">
                          {showAddModal ? "Add Barber" : "Edit Barber"}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => {
                            showAddModal ? setShowAddModal(false) : setShowEditModal(false);
                          }}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            showAddModal ? handleSubmit(e) : handleUpdate();
                          }}
                        >
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="form-control mb-3"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          <input
                            type="number"
                            name="experience"
                            placeholder="Experience (years)"
                            className="form-control mb-3"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                          />
                          <input
                            type="text"
                            name="specialization"
                            placeholder="Specialization"
                            className="form-control mb-3"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            required
                          />
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            className="form-control mb-3"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="form-control mb-3"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />

                          <h6>Time Slots</h6>
                          {formData.timeSlots.map((ts, i) => (
                            <div key={i} className="mb-3 border p-2 rounded">
                              <div className="d-flex align-items-center mb-2">
                                <input
                                  type="date"
                                  value={ts.date}
                                  onChange={(e) =>
                                    handleTimeSlotChange(i, "date", e.target.value)
                                  }
                                  className="form-control me-2"
                                  required
                                />
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => removeTimeSlot(i)}
                                >
                                  Remove Date
                                </button>
                              </div>
                              {ts.slots.map((slot, j) => (
                                <div key={j} className="d-flex mb-2">
                                  <input
                                    type="time"
                                    value={slot.start}
                                    onChange={(e) => handleSlotChange(i, j, "start", e.target.value)}
                                    className="form-control me-2"
                                    required
                                  />
                                  <input
                                    type="time"
                                    value={slot.end}
                                    onChange={(e) => handleSlotChange(i, j, "end", e.target.value)}
                                    className="form-control me-2"
                                    required
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                    onClick={() => removeSlot(i, j)}
                                  >
                                    Remove Slot
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                                onClick={() => addSlot(i)}
                              >
                                Add Slot
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-primary mb-3"
                            onClick={addTimeSlot}
                          >
                            Add Another Date
                          </button>

                          <button type="submit" className="btn btn-danger">
                            {showAddModal ? "Save" : "Update"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;

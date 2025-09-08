import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Agent = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    specialization: "",
    phone: "",
    email: "",
    timeSlots: "",
  });

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

  // ✅ Handle Input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add Barber
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        timeSlots: formData.timeSlots
          .split(",")
          .map((slot) => slot.trim()), // convert string to array
      };

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
      setFormData({
        name: "",
        experience: "",
        specialization: "",
        phone: "",
        email: "",
        timeSlots: "",
      });
      getBarbers();
    } catch (error) {
      toast.error("Failed to create barber!");
    }
  };

  // ✅ Edit Barber
  const handleEdit = (barber) => {
    setSelectedBarber(barber);
    setFormData({
      ...barber,
      timeSlots: barber.timeSlots.join(", "), // display as comma-separated string
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...formData,
        timeSlots: formData.timeSlots
          .split(",")
          .map((slot) => slot.trim()),
      };

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
    } catch {
      toast.error("Error updating barber");
    }
  };

  // ✅ Delete Barber
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this barber?")) return;
    try {
      const response = await fetch(
        `http://206.189.130.102:5001/api/v1/admin/barbers/delete-barber /${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Error deleting barber");

      toast.success("Barber deleted!");
      getBarbers();
    } catch {
      toast.error("Error deleting barber");
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
                              <span>Barbers</span>
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
                      <h4>Barber List</h4>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => setShowAddModal(true)}
                      >
                        <i className="fa-solid fa-circle-plus me-2"></i>Add Barber
                      </button>
                    </div>
                    <div
                      className="card-body scroll-w-1 card__scroll overflow-auto"
                      style={{ maxHeight: "600px" }}
                    >
                      {loading ? (
                        <div className="text-center py-3">
                          <div
                            className="spinner-border text-dark"
                            role="status"
                          ></div>
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
                                    {barber.timeSlots &&
                                      barber.timeSlots.map(slot => `${slot.start} - ${slot.end}`).join(", ")}
                                  </td>

                                  <td>
                                    <button
                                      className="btn btn-warning text-white rounded-5 me-2"
                                      onClick={() => handleEdit(barber)}
                                    >
                                      Edit{" "}
                                      <i className="fa-solid fa-pen ms-1"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger rounded-5"
                                      onClick={() => handleDelete(barber._id)}
                                    >
                                      Delete{" "}
                                      <i className="fa-solid fa-trash-can ms-1"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  No barbers found
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

            {/* Add Modal */}
            {showAddModal && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Barber</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowAddModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
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
                        <input
                          type="text"
                          name="timeSlots"
                          placeholder="Enter time slots (comma separated, e.g. 10:00, 11:00)"
                          className="form-control mb-3"
                          value={formData.timeSlots}
                          onChange={handleInputChange}
                          required
                        />
                        <button type="submit" className="btn btn-danger">
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {showEditModal && (
              <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Barber</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowEditModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdate();
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
                        <input
                          type="text"
                          name="timeSlots"
                          placeholder="Enter time slots (comma separated)"
                          className="form-control mb-3"
                          value={formData.timeSlots}
                          onChange={handleInputChange}
                          required
                        />
                        <button type="submit" className="btn btn-danger">
                          Update
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
  );
};

export default Agent;

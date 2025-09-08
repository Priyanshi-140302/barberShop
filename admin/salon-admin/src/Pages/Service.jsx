import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const [selectedService, setSelectedService] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Get Services
  const getServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://206.189.130.102:5001/api/v1/admin/services/getAllService");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      // adjust according to API structure
      setServices(result.services || result || []);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // ✅ Handle input
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add Service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://206.189.130.102:5001/api/v1/admin/services/create-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error creating service");

      toast.success("Service added successfully!");
      setShowAddModal(false);
      getServices();
    } catch (error) {
      toast.error("Failed to create service!");
    }
  };

  // ✅ Edit Service
  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData(service);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://206.189.130.102:5001/api/v1/admin/services/updateService/${selectedService._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Error updating service");

      toast.success("Service updated successfully!");
      setShowEditModal(false);
      getServices();
    } catch {
      toast.error("Error updating service");
    }
  };

  // ✅ Delete Service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const response = await fetch(`http://206.189.130.102:5001/api/v1/admin/services/deleteService/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting service");

      toast.success("Service deleted!");
      getServices();
    } catch {
      toast.error("Error deleting service");
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
                              <span><Link to="/dashboard">Home</Link></span>
                            </li>
                            <li className="active"><span>Services</span></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Table Card */}
              <div className="row g-20">
                <div className="col-xl-12">
                  <div className="card__wrapper">
                    <div className="card__header d-flex justify-content-between align-items-center">
                      <h4>Service List</h4>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => setShowAddModal(true)}
                      >
                        <i className="fa-solid fa-circle-plus me-2"></i>Add Service
                      </button>
                    </div>
                    <div className="card-body scroll-w-1 card__scroll overflow-auto" style={{ maxHeight: "500px" }}>
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
                              <th>Price</th>
                              <th>Duration</th>
                              <th>Description</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.length > 0 ? (
                              services.map((service, index) => (
                                <tr key={service._id}>
                                  <td>{index + 1}</td>
                                  <td>{service.name}</td>
                                  <td>₹{service.price}</td>
                                  <td>{service.duration}</td>
                                  <td>{service.description}</td>
                                  <td>
                                    <button
                                      className="btn btn-warning text-white rounded-5 me-2"
                                      onClick={() => handleEdit(service)}
                                    >
                                      Edit <i className="fa-solid fa-pen ms-1"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger rounded-5"
                                      onClick={() => handleDelete(service._id)}
                                    >
                                      Delete <i className="fa-solid fa-trash-can ms-1"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  No services found
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

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Service</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      className="form-control"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Service</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    className="form-control"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;

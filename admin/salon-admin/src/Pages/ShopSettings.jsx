"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopSettingsPage = () => {
  const [workingHours, setWorkingHours] = useState({ start: "", end: "" });
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ date: "", reason: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Fetch shop settings
  const fetchShopSettings = async () => {
    try {
      const res = await fetch(
        "http://206.189.130.102:5001/api/v1/admin/shop/getShopSettings"
      );
      const data = await res.json();
      if (data.settings) {
        setWorkingHours(data.settings.workingHours || { start: "", end: "" });
        setHolidays(data.settings.holidays || []);
      }
    } catch (error) {
      toast.error("Failed to load shop settings");
    }
  };

  useEffect(() => {
    fetchShopSettings();
  }, []);

  // ✅ Update working hours
  const updateWorkingHours = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "http://206.189.130.102:5001/api/v1/admin/shop/working-hours",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workingHours, holidays }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Shop settings updated successfully");
        fetchShopSettings();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Error updating shop settings");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add holiday
  const addHoliday = () => {
    if (!newHoliday.date || !newHoliday.reason) {
      toast.error("Please provide date and reason");
      return;
    }
    setHolidays([...holidays, newHoliday]);
    setNewHoliday({ date: "", reason: "" });
  };

  // ✅ Remove holiday
  const removeHoliday = (index) => {
    const updated = holidays.filter((_, i) => i !== index);
    setHolidays(updated);
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
              {/* ✅ Breadcrumb */}
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
                              <span>Shop Settings</span>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Shop Settings Card */}
              <div className="row g-20">
                <div className="col-xl-12">
                  <div className="card__wrapper">
                    <div className="card__header d-flex justify-content-between align-items-center">
                      <h4>Shop Settings</h4>
                    </div>
                    <div className="card-body">
                      {/* Working Hours */}
                      <div className="mb-4">
                        <h5>Working Hours</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <label>Start Time</label>
                            <input
                              type="time"
                              className="form-control"
                              value={workingHours.start}
                              onChange={(e) =>
                                setWorkingHours({
                                  ...workingHours,
                                  start: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-6">
                            <label>End Time</label>
                            <input
                              type="time"
                              className="form-control"
                              value={workingHours.end}
                              onChange={(e) =>
                                setWorkingHours({
                                  ...workingHours,
                                  end: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Holidays */}
                      <div className="mb-4">
                        <h5>Holidays</h5>
                        {holidays.map((h, index) => (
                          <div
                            key={index}
                            className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
                          >
                            <span>
                              📅 {new Date(h.date).toLocaleDateString()} -{" "}
                              {h.reason}
                            </span>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => removeHoliday(index)}
                            >
                              ❌ Remove
                            </button>
                          </div>
                        ))}

                        {/* Add Holiday */}
                        <div className="row mt-3">
                          <div className="col-md-5">
                            <input
                              type="date"
                              className="form-control"
                              value={newHoliday.date}
                              onChange={(e) =>
                                setNewHoliday({
                                  ...newHoliday,
                                  date: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-5">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Reason"
                              value={newHoliday.reason}
                              onChange={(e) =>
                                setNewHoliday({
                                  ...newHoliday,
                                  reason: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="col-md-2">
                            <button
                              className="btn btn-primary w-100"
                              onClick={addHoliday}
                            >
                              ➕ Add
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <button
                        className="btn btn-success"
                        onClick={updateWorkingHours}
                        disabled={loading}
                      >
                        {loading ? "Updating..." : "Save Settings"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default ShopSettingsPage;

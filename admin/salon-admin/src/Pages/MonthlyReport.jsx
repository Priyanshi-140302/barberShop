import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const MonthlyReport = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-08");

  const dummyBookings = [
    { id: 1, customer: "John Doe", service: "Haircut", date: "2025-08-12", dress: "D-101", price: 5000 },
    { id: 2, customer: "Jane Smith", service: "Makeup", date: "2025-08-15", dress: "D-205", price: 3500 },
    { id: 3, customer: "Mark Wilson", service: "wax", date: "2025-08-20", dress: "D-309", price: 7000 },
  ];

  const totalRevenue = dummyBookings.reduce((acc, b) => acc + b.price, 0);

  return (
    <div className="container-fluid p-0">
      <div className="dashboard-page">
        <div className="page__full-wrapper">
          <Sidebar />
          <div className="page__body-wrapper">
            <Header />

            {/* Breadcrumb */}
            <div className="app__slide-wrapper">
              <div className="breadcrumb__area">
                <div className="breadcrumb__wrapper mb-35 d-flex justify-content-between align-items-center">
                  <div className="breadcrumb__main">
                    <div className="breadcrumb__inner d-flex align-items-center">
                      <div className="breadcrumb__icon me-2">
                        <i className="flaticon-home"></i>
                      </div>
                      <div className="breadcrumb__menu">
                        <nav>
                          <ul>
                            <li><span><Link to="/dashboard">Home</Link></span></li>
                            <li className="active"><span>Monthly Report</span></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="breadcrum__button d-flex gap-2">
                    <button className="btn btn-outline-primary">
                      <i className="fa-solid fa-file-export me-2"></i> Export
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="fa-solid fa-print me-2"></i> Print
                    </button>
                  </div>
                </div>
              </div>

              {/* Month Selector */}
              <div className="px-4 mb-4 w-25">
                <label className="form-label">Select Month</label>
                <input
                  type="month"
                  className="form-control"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>

              {/* Report Cards */}
              <div className="row g-3 px-4">
                {dummyBookings.map((b, index) => (
                  <div key={b.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="card mb-3 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title">{b.customer}</h5>
                        <p className="card-text mb-1"><strong>Item:</strong> {b.item}</p>
                        <p className="card-text mb-1"><strong>Date:</strong> {b.date}</p>
                        <p className="card-text mb-1"><strong>Service:</strong> {b.dress}</p>
                        <p className="card-text mb-0"><strong>Price:</strong> ₹{b.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="px-4 mt-3 d-flex justify-content-end">
                <h5>Total Bookings: {dummyBookings.length} | Total Revenue: ₹{totalRevenue}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyReport;

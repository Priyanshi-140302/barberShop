import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [dashboardDetail] = useState({
    total_customers: 120,
    total_appointments_today: 18,
    total_appointments_week: 85,
    total_revenue_month: 45000,
    active_barbers: 5,
    upcoming_appointments: [
      { id: 1, service: 'Haircut - Classic Style', customer_name: 'Riya Sharma', appointment_date: '2025-09-05 10:30 AM', barber: 'John', mobile: '9876543210' },
      { id: 2, service: 'Beard Trim - Wedding Special', customer_name: 'Arjun Patel', appointment_date: '2025-09-05 11:15 AM', barber: 'David', mobile: '9876543211' },
      { id: 3, service: 'Hair Color - Highlight', customer_name: 'Priya Verma', appointment_date: '2025-09-05 12:00 PM', barber: 'Alex', mobile: '9876543212' },
    ],
    recent_customers: [
      { id: 1, name: 'Riya Sharma', mobile: '9876543210' },
      { id: 2, name: 'Arjun Patel', mobile: '9876543211' },
      { id: 3, name: 'Priya Verma', mobile: '9876543212' },
    ]
  });

  return (
    <div className="container-fluid p-0">
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
                      <div className="breadcrumb__icon"><i className="flaticon-home"></i></div>
                      <div className="breadcrumb__menu">
                        <nav>
                          <ul>
                            <li><span><Link to="/dashboard">Home</Link></span></li>
                            <li className="active"><span>Dashboard</span></li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="row g-20">
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <Link to="/customers">
                    <div className="Expovent__count-item mb-20 hover-card">
                      <div className="Expovent__count-thumb include__bg transition-3"
                        style={{ backgroundImage: `url(assets/img/bg/count-bg.png)` }}></div>
                      <div className="Expovent__count-content">
                        <h3>{dashboardDetail.total_customers}</h3>
                        <span>Total Customers</span>
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-users"></i>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6">
                  <Link to="/appointments">
                    <div className="Expovent__count-item mb-20 hover-card">
                      <div className="Expovent__count-thumb include__bg transition-3"
                        style={{ backgroundImage: `url(assets/img/bg/count-bg.png)` }}></div>
                      <div className="Expovent__count-content">
                        <h3>{dashboardDetail.total_appointments_today} / {dashboardDetail.total_appointments_week}</h3>
                        <span>Appointments (Today / This Week)</span>
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-calendar-check"></i>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6">
                  <div className="Expovent__count-item mb-20 hover-card">
                    <div className="Expovent__count-thumb include__bg transition-3"
                      style={{ backgroundImage: `url(assets/img/bg/count-bg.png)` }}></div>
                    <div className="Expovent__count-content">
                      <h3>₹{dashboardDetail.total_revenue_month}</h3>
                      <span>Revenue (This Month)</span>
                    </div>
                    <div className="Expovent__count-icon">
                      <i className="fa-solid fa-coins"></i>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6">
                  <Link to="/barbers">
                    <div className="Expovent__count-item mb-20 hover-card">
                      <div className="Expovent__count-thumb include__bg transition-3"
                        style={{ backgroundImage: `url(assets/img/bg/count-bg.png)` }}></div>
                      <div className="Expovent__count-content">
                        <h3>{dashboardDetail.active_barbers}</h3>
                        <span>Active Barbers</span>
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-user-tie"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Tables */}
              <div className="row g-20">
                <div className="col-xl-6">
                  <div className="card__wrapper">
                    <div className="card__header"><h4>Upcoming Appointments</h4></div>
                    <div className="card-body scroll-w-1 card__scroll overflow-auto" style={{ maxHeight: '300px' }}>
                      <table className="table mb-0 mt-3">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Barber</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dashboardDetail.upcoming_appointments.map(app => (
                            <tr key={app.id}>
                              <td>{app.customer_name}</td>
                              <td>{app.service}</td>
                              <td>{app.barber}</td>
                              <td>{app.appointment_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="card__wrapper">
                    <div className="card__header"><h4>Recent Customers</h4></div>
                    <div className="card-body scroll-w-1 card__scroll overflow-auto" style={{ maxHeight: '300px' }}>
                      <table className="table mb-0 mt-3">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dashboardDetail.recent_customers.map(c => (
                            <tr key={c.id}>
                              <td>{c.name}</td>
                              <td>{c.mobile}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="row g-20 mt-4">
                <div className="col-xl-12 d-flex gap-3">
                  <Link to="/appointments/add" className="btn btn-outline-danger">Add Appointment</Link>
                  <Link to="/barbers/add" className="btn btn-outline-danger">Add Barber</Link>
                  <Link to="/services/add" className="btn btn-outline-danger">Add Service</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

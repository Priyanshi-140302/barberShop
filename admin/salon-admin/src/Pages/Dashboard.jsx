import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dashboardDetail, setDashboardDetail] = useState({
    total_customers: 0,
    total_appointments: 0,
    total_holidays: 0,
    total_services: 0,
    active_barbers: 0,
    upcoming_appointments: [],
    recent_customers: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Total Customers
        const resCustomers = await fetch(
          "http://206.189.130.102:5001/api/v1/admin/appointments/total-appointments"
        );
        const { totalCustomers } = await resCustomers.json();

        // 2. Total Holidays
        const resHolidays = await fetch(
          "http://206.189.130.102:5001/api/v1/admin/shop/get-total-monthly-holidays"
        );
        const { totalHolidays } = await resHolidays.json();

        // 3. Total Barbers
        const resBarbers = await fetch(
          "http://206.189.130.102:5001/api/v1/admin/barbers/total-barbers"
        );
        const { totalBarbers } = await resBarbers.json();

        // 4. Total Services
        const resServices = await fetch(
          "http://206.189.130.102:5001/api/v1/admin/services/total-services"
        );
        const { totalServices } = await resServices.json();

        // 5. All Appointments (for total + upcoming + customers)
        const resAllAppointments = await fetch(
          "http://206.189.130.102:5001/api/v1/admin/appointments/get-appointments"
        );
        const { appointments } = await resAllAppointments.json();

        const totalAppointments = appointments.length;

        // ✅ Upcoming appointments (nearest 5)
        const upcomingAppointments = [...appointments]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 5)
          .map((a) => ({
            id: a._id,
            customer_name: a.name,
            service: a.serviceIds?.map((s) => s.name).join(", ") || "N/A",
            barber: a.barberId?.name || "N/A",
            appointment_date: `${new Date(a.date).toLocaleDateString()} ${a.time}`,
            mobile: a.mobile,
          }));

        // ✅ Recent customers (unique last 5)
        const uniqueCustomers = [];
        const recentCustomers = [];
        for (let app of [...appointments].reverse()){
          if (!uniqueCustomers.includes(app.mobile)) {
            uniqueCustomers.push(app.mobile);
            recentCustomers.push({
              id: app._id,
              name: app.name,
              mobile: app.mobile,
            });
          }
          if (recentCustomers.length >= 5) break;
        }

        setDashboardDetail({
          total_customers: totalCustomers,
          total_appointments: totalAppointments,
          total_holidays: totalHolidays,
          total_services: totalServices,
          active_barbers: totalBarbers,
          upcoming_appointments: upcomingAppointments,
          recent_customers: recentCustomers,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

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
                              <span>Dashboard</span>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="row g-20">
                {/* Total Appointments */}
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <Link to="/appoinments">
                    <div className="Expovent__count-item mb-20 hover-card">
                      <div
                        className="Expovent__count-thumb include__bg transition-3"
                        style={{
                          backgroundImage: `url(assets/img/bg/count-bg.png)`,
                        }}
                      ></div>
                      <div className="Expovent__count-content">
                        <h3>{dashboardDetail.total_appointments}</h3>
                        <span>Total Appointments</span>
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-calendar-check"></i>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Total Services */}
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <Link to="/services">
                    <div className="Expovent__count-item mb-20 hover-card">
                      <div
                        className="Expovent__count-thumb include__bg transition-3"
                        style={{
                          backgroundImage: `url(assets/img/bg/count-bg.png)`,
                        }}
                      ></div>
                      <div className="Expovent__count-content">
                        <h3>{dashboardDetail.total_services}</h3>
                        <span>Total Services</span>
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-scissors"></i>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Total agents */}
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <Link to="/agents">
                    <div className="Expovent__count-item mb-20 hover-card">
                      <div
                        className="Expovent__count-thumb include__bg transition-3"
                        style={{
                          backgroundImage: `url(assets/img/bg/count-bg.png)`,
                        }}
                      ></div>
                      <div className="Expovent__count-content">
                        <h3>{dashboardDetail.active_barbers}</h3>
                        <span>Total Agents</span>
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-user-tie"></i>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Total Holidays */}
                <div className="col-xl-3 col-lg-6 col-md-6">
                  <Link to={'/shop-settings'}>
                  <div className="Expovent__count-item mb-20 hover-card">
                    <div
                      className="Expovent__count-thumb include__bg transition-3"
                      style={{
                        backgroundImage: `url(assets/img/bg/count-bg.png)`,
                      }}
                    ></div>
                    <div className="Expovent__count-content">
                      <h3>{dashboardDetail.total_holidays}</h3>
                      <span>Total Holidays</span>
                    </div>
                    <div className="Expovent__count-icon">
                      <i className="fa-solid fa-umbrella-beach"></i>
                    </div>
                  </div>
                  </Link>
                </div>
              </div>

              {/* Tables */}
              <div className="row g-20">
                <div className="col-xl-6">
                  <div className="card__wrapper">
                    <div className="card__header">
                      <h4>Upcoming Appointments</h4>
                    </div>
                    <div
                      className="card-body scroll-w-1 card__scroll overflow-auto"
                      style={{ maxHeight: "300px" }}
                    >
                      <table className="table mb-0 mt-3">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Agent</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dashboardDetail.upcoming_appointments.map((app) => (
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
                    <div className="card__header">
                      <h4>Recent Customers</h4>
                    </div>
                    <div
                      className="card-body scroll-w-1 card__scroll overflow-auto"
                      style={{ maxHeight: "300px" }}
                    >
                      <table className="table mb-0 mt-3">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dashboardDetail.recent_customers.map((c) => (
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
              {/* <div className="row g-20 mt-4">
                <div className="col-xl-12 d-flex gap-3">
                  <Link
                    to="/appointments/add"
                    className="btn btn-outline-danger"
                  >
                    Add Appointment
                  </Link>
                  <Link to="/agents" className="btn btn-outline-danger">
                    Add Agents
                  </Link>
                  <Link to="/services" className="btn btn-outline-danger">
                    Add Service
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

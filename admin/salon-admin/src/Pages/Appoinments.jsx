import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'

const Appointments = () => {

    const [appoinmentDetail] = useState({
        upcoming_appointments: [
            {
                id: 1,
                service: 'Haircut - Classic Style',
                customer_name: 'Riya Sharma',
                customer_id: 1,
                appointment_date: '2025-09-05 10:30 AM',
                barber: 'John',
                mobile: '9876543210'
            },
            {
                id: 2,
                service: 'Beard Trim - Wedding Special',
                customer_name: 'Arjun Patel',
                customer_id: 2,
                appointment_date: '2025-09-05 11:15 AM',
                barber: 'David',
                mobile: '9876543211'
            },
            {
                id: 3,
                service: 'Hair Color - Highlight',
                customer_name: 'Priya Verma',
                customer_id: 2,
                appointment_date: '2025-09-05 12:00 PM',
                barber: 'Alex',
                mobile: '9876543212'
            },
            {
                id: 4, service: 'Haircut - Classic Style',
                customer_name: 'Riya Sharma',
                customer_id: 1,
                appointment_date: '2025-09-05 10:30 AM',
                barber: 'John',
                mobile: '9876543210'
            },
            {
                id: 5,
                service: 'Beard Trim - Wedding Special',
                customer_name: 'Arjun Patel',
                customer_id: 2,
                appointment_date: '2025-09-05 11:15 AM',
                barber: 'David',
                mobile: '9876543211'
            },
            {
                id: 6,
                service: 'Hair Color - Highlight',
                customer_name: 'Priya Verma',
                customer_id: 2,
                appointment_date: '2025-09-05 12:00 PM',
                barber: 'Alex',
                mobile: '9876543212'
            },
        ]
    });

    return (
        <>
            <div className="container-fluid p-0">
                <div className="appoinment-page">

                    {/* Dashboard area start */}
                    <div className="page__full-wrapper">

                        {/* App sidebar area start */}
                        <Sidebar />
                        {/* App sidebar area end */}

                        <div className="page__body-wrapper">

                            {/* App header area start */}
                            <Header />
                            {/* App header area end */}

                            {/* App side area start */}
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
                                                            <li className="active"><span>Appoinments</span></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Tables */}
                                <div className="row g-20">
                                    {appoinmentDetail.upcoming_appointments.map(app => (
                                        <div className="col-xl-3 col-lg-6 col-md-6">
                                            <Link>
                                                <div className="Expovent__count-item mb-20 hover-card">
                                                    <div className="Expovent__count-thumb include__bg transition-3"
                                                        style={{ backgroundImage: `url(assets/img/bg/count-bg.png)` }}></div>
                                                    <div className="Expovent__count-content w-100">
                                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                                            <h4 className="card-title fw-bold">{app.customer_name}</h4>
                                                            <h6 className="text-muted">03-09-2025</h6>
                                                        </div>
                                                        <p className="card-text mb-1"><strong>Service:</strong> {app.service}</p>
                                                        <p className="card-text mb-1"><strong>Barber:</strong> {app.barber}</p>
                                                        <p className="card-text mb-0"><strong>Time:</strong> {app.appointment_date}</p>
                                                        <p className="card-text mb-0"><strong>mobile:</strong> {app.mobile}</p>
                                                    </div>
                                                    {/* <div className="Expovent__count-icon">
                                                        <i className="fa-solid fa-users"></i>
                                                    </div> */}
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* App side area end */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appointments
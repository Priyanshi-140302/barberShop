import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div
                className="Expovent__sidebar"
                style={{ backgroundImage: 'url(assets/img/bg/dropdown-bg.png)' }}
            >
                <div className="logo-details">
                    <span>
                        <Link to="/dashboard">
                            {/* <img
                                className="logo__white w-100 h-100 py-2"
                                src="assets/img/logo/logo.png"
                                alt="logo not found"
                            /> */}
                            <h2 className="">Salon<span className="text-danger">.</span></h2>
                        </Link>
                    </span>
                </div>
                <div className="sidebar__inner simple-bar">
                    <div className="dlabnav">
                        <ul className="metismenu" id="menu">
                            <li>
                                <Link to="/dashboard" aria-expanded="false">
                                    <i className="fa-solid fa-house"></i>
                                    <span className="nav-text">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/appoinments" aria-expanded="false">
                                    <i className="fa-solid fa-calendar-check"></i>
                                    <span className="nav-text">Appoinments</span>
                                </Link>
                            </li>
                             <li>
                                <Link to="/services" aria-expanded="false">
                                    <i className="fa-solid fa-calendar-check"></i>
                                    <span className="nav-text">Services</span>
                                </Link>
                            </li>
                             <li>
                                <Link to="/agents" aria-expanded="false">
                                    <i className="fa-solid fa-calendar-check"></i>
                                    <span className="nav-text">Agents</span>
                                </Link>
                            </li>
                             <li>
                                <Link to="/shop-settings" aria-expanded="false">
                                    <i className="fa-solid fa-calendar-check"></i>
                                    <span className="nav-text">Shop-Settings</span>
                                </Link>
                            </li>
                             <li>
                                <Link to="/time-slots" aria-expanded="false">
                                    <i className="fa-solid fa-calendar-check"></i>
                                    <span className="nav-text">Time-Slots</span>
                                </Link>
                            </li>
                            {/* <li>
                                <Link to="/monthly-report" aria-expanded="false">
                                    <i className="fa-solid fa-calendar-alt"></i>
                                    <span className="nav-text">Monthly Report</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/master" aria-expanded="false">
                                    <i className="fa-solid fa-cogs"></i>
                                    <span className="nav-text">Master</span>
                                </Link>
                            </li> */}
                        </ul>

                        <div className="sidebar__copyright position-absolute bottom-0 mb-2">
                            <p>Copyright @ 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
import React from 'react';
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'

const testingCode = () => {

    return (
        <>
            <div className="container-fluid p-0">
                <div className="dashboard-page">

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
                                                            <li className="active"><span>Agencies</span></li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default testingCode
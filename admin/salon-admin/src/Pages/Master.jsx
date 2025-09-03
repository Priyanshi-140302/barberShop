import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const Master = () => {
  return (
    <>
      <div className="container-fluid p-0">
        <div className="master-page">
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
                                <span>
                                  <Link to="/dashboard">Home</Link>
                                </span>
                              </li>
                              <li className="active">
                                <span>Master</span>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-20">
                  <div className="col-xl-3 col-lg-6 col-md-6">
                    <Link
                      to="/"
                      className="Expovent__count-item mb-20"
                    >
                      <div
                        className="Expovent__count-thumb include__bg transition-3"
                        style={{
                          backgroundImage: `url(assets/img/bg/count-bg.png)`,
                        }}
                      ></div>
                      <div className="Expovent__count-content">
                        <h3 className="Expovent__count-number">Lehenga Stock</h3>
                        {/* <span className="Expovent__count-text">Total Events</span> */}
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-calendar-days"></i>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xl-3 col-lg-6 col-md-6">
                    <Link
                      to="/supervisor-master"
                      className="Expovent__count-item mb-20"
                    >
                      <div
                        className="Expovent__count-thumb include__bg transition-3"
                        style={{
                          backgroundImage: `url(assets/img/bg/count-bg.png)`,
                        }}
                      ></div>
                      <div className="Expovent__count-content">
                        <h3 className="Expovent__count-number">Jewellery Stock</h3>
                        {/* <span className="Expovent__count-text">Total Supervisors</span> */}
                      </div>
                      <div className="Expovent__count-icon">
                        <i className="fa-solid fa-user-tie"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* App side area end */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Master;

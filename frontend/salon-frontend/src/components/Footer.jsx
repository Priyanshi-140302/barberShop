import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="">
            <footer id="footer" className="footer position-relative light-background">

                <div className="container footer-top">
                    <div className="row gy-4">

                        {/* About Section */}
                        <div className="col-lg-5 col-md-12 footer-about">
                            <a href="/" className="logo d-flex align-items-center">
                                <span className="sitename">Append</span>
                            </a>
                            <p>
                                Cras fermentum odio eu feugiat lide par naso tierra. Justo eget
                                nada terra videa magna derita valies darta donna mare fermentum
                                iaculis eu non diam phasellus.
                            </p>
                            <div className="social-links d-flex mt-4">
                                <Link to="/"><i className="bi bi-twitter-x"></i></Link>
                                <Link to="/"><i className="bi bi-facebook"></i></Link>
                                <Link to="/"><i className="bi bi-instagram"></i></Link>
                                <Link to="/"><i className="bi bi-linkedin"></i></Link>
                            </div>
                        </div>

                        {/* Useful Links */}
                        <div className="col-lg-2 col-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/">About us</Link></li>
                                <li><Link to="/">Services</Link></li>
                                <li><Link to="/">Terms of service</Link></li>
                                <li><Link to="/">Privacy policy</Link></li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="col-lg-2 col-6 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><Link to="/">Web Design</Link></li>
                                <li><Link to="/">Web Development</Link></li>
                                <li><Link to="/">Product Management</Link></li>
                                <li><Link to="/">Marketing</Link></li>
                                <li><Link to="/">Graphic Design</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>Contact Us</h4>
                            <p>A108 Adam Street</p>
                            <p>New York, NY 535022</p>
                            <p>United States</p>
                            <p className="mt-4"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                            <p><strong>Email:</strong> <span>info@example.com</span></p>
                        </div>

                    </div>
                </div>

                {/* Copyright */}
                <div className="container copyright text-center mt-4">
                    <p>
                        © <span>Copyright</span> <strong className="sitename">Append</strong>{" "}
                        <span>All Rights Reserved</span>
                    </p>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>{" "}
                        Distributed By <a href="https://themewagon.com/">ThemeWagon</a>
                    </div>
                </div>

            </footer>
            {/* <!-- Scroll Top --> */}
            <Link to="/" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>

            {/* <!-- Preloader --> */}
            {/* <div id="preloader"></div> */}
        </div>

    )
}

export default Footer
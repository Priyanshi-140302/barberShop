import React from 'react'
import { Link } from "react-router-dom";

const AboutSection = () => {
    return (
        <div>
            <section id="about" className="about section light-background">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row align-items-xl-center gy-5">

                        {/* Left Content */}
                        <div className="col-xl-5 content">
                            <h3>About Us</h3>
                            <h2>Ducimus rerum libero reprehenderit cumque</h2>
                            <p>
                                Ipsa sint sit. Quis ducimus tempore dolores impedit et dolor
                                cumque alias maxime. Enim reiciendis minus et rerum hic non.
                                Dicta quas cum quia maiores iure. Quidem nulla qui assumenda
                                incidunt voluptatem tempora deleniti soluta.
                            </p>
                            <Link to="/" className="read-more">
                                <span>Read More</span>
                                <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>

                        {/* Right Side with Icon Boxes */}
                        <div className="col-xl-7">
                            <div className="row gy-4 icon-boxes">

                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                                    <div className="icon-box">
                                        <i className="bi bi-buildings"></i>
                                        <h3>Eius provident</h3>
                                        <p>
                                            Magni repellendus vel ullam hic officia accusantium ipsa
                                            dolor omnis dolor voluptatem
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                                    <div className="icon-box">
                                        <i className="bi bi-clipboard-pulse"></i>
                                        <h3>Rerum aperiam</h3>
                                        <p>
                                            Autem saepe animi et aut aspernatur culpa facere. Rerum
                                            saepe rerum voluptates quia
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                                    <div className="icon-box">
                                        <i className="bi bi-command"></i>
                                        <h3>Veniam omnis</h3>
                                        <p>
                                            Omnis perferendis molestias culpa sed. Recusandae quas
                                            possimus. Quod consequatur corrupti
                                        </p>
                                    </div>
                                </div>

                                <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
                                    <div className="icon-box">
                                        <i className="bi bi-graph-up-arrow"></i>
                                        <h3>Delares sapiente</h3>
                                        <p>
                                            Sint et dolor voluptas minus possimus nostrum. Reiciendis
                                            commodi eligendi omnis quideme lorenda
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutSection
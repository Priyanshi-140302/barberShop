import React from 'react'
import { Link } from "react-router-dom";

const servicesData = [
    { icon: 'bi-briefcase', title: 'Lorem Ipsum', desc: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident' },
    { icon: 'bi-card-checklist', title: 'Dolor Sitema', desc: 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata' },
    { icon: 'bi-bar-chart', title: 'Sed ut perspiciatis', desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur' },
    { icon: 'bi-binoculars', title: 'Magni Dolores', desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' },
    { icon: 'bi-brightness-high', title: 'Nemo Enim', desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque' },
    { icon: 'bi-calendar4-week', title: 'Eiusmod Tempor', desc: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi' },
    { icon: 'bi-chat-square-text', title: 'Midela Terent', desc: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi' },
    { icon: 'bi-clipboard-data', title: 'Pira Neve', desc: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum' },
]

const ServicesSection = () => {
    return (
        <div>
            <section id="services" className="services section">
                {/* Section Title */}
                <div className="container section-title" data-aos="fade-up">
                    <h2>Services</h2>
                    <p>
                        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                        consectetur velit
                    </p>
                </div>
                {/* End Section Title */}

                <div className="container">
                    <div className="row gy-4">
                        {servicesData.map((service, index) => (
                            <div key={index} className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                                <div className="service-item d-flex">
                                    <div className="icon flex-shrink-0">
                                        <i className={`bi ${service.icon}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="title">
                                            <Link to="/services-details" className="stretched-link">
                                                {service.title}
                                            </Link>
                                        </h4>
                                        <p className="description">
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Repeat other service items the same way... */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServicesSection
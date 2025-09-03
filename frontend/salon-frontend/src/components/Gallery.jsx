import React, { useEffect } from "react";
import Isotope from "isotope-layout";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

const Gallery = () => {
    useEffect(() => {
        // Init Isotope
        let iso = new Isotope(".portfolio-container", {
            itemSelector: ".portfolio-item",
            layoutMode: "masonry",
        });

        // Portfolio filter buttons
        const filters = document.querySelectorAll(".portfolio-filters li");
        filters.forEach((filter) => {
            filter.addEventListener("click", function () {
                filters.forEach((el) => el.classList.remove("filter-active"));
                this.classList.add("filter-active");

                iso.arrange({ filter: this.getAttribute("data-filter") });
            });
        });

        // Init GLightbox
        GLightbox({
            selector: ".glightbox",
        });
    }, []);

    // Portfolio items data (instead of hardcoding in JSX)
    const portfolioItems = [
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-1.jpg",
            title: "App 1",
            filter: "filter-app",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-2.jpg",
            title: "Product 1",
            filter: "filter-product",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-3.jpg",
            title: "Branding 1",
            filter: "filter-branding",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-4.jpg",
            title: "App 2",
            filter: "filter-app",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-5.jpg",
            title: "Product 2",
            filter: "filter-product",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-6.jpg",
            title: "Branding 2",
            filter: "filter-branding",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-7.jpg",
            title: "App 3",
            filter: "filter-app",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-8.jpg",
            title: "Product 3",
            filter: "filter-product",
            desc: "Lorem ipsum, dolor sit",
        },
        {
            img: "assets/img/masonry-portfolio/masonry-portfolio-9.jpg",
            title: "Branding 3",
            filter: "filter-branding",
            desc: "Lorem ipsum, dolor sit",
        },
    ];

    return (
        <section id="portfolio" className="portfolio section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Gallery</h2>
                <p>
                    Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                    consectetur velit
                </p>
            </div>

            <div className="container">
                {/* Portfolio Filters */}
                <ul
                    className="portfolio-filters isotope-filters"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <li data-filter="*" className="filter-active">
                        All
                    </li>
                    <li data-filter=".filter-app">App</li>
                    <li data-filter=".filter-product">Card</li>
                    <li data-filter=".filter-branding">Web</li>
                </ul>

                {/* Portfolio Container */}
                <div
                    className="row gy-4 portfolio-container"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {portfolioItems.map((item, index) => (
                        <div
                            key={index}
                            className={`col-lg-4 col-md-6 portfolio-item ${item.filter}`}
                        >
                            <img src={item.img} className="img-fluid" alt={item.title} />
                            <div className="portfolio-info">
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                                <a
                                    href={item.img}
                                    title={item.title}
                                    data-gallery={`portfolio-gallery-${item.filter}`}
                                    className="glightbox preview-link"
                                >
                                    <i className="bi bi-zoom-in"></i>
                                </a>
                                <a
                                    href="portfolio-details.html"
                                    title="More Details"
                                    className="details-link"
                                >
                                    <i className="bi bi-link-45deg"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Gallery
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import Footer from "./Footer";
import ClientsSection from "./ClientsSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import Gallery from "./Gallery";

const Home = () => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [agent, setAgent] = useState("Any Agent");

  const [barbers, setBarbers] = useState([]);
  const [barberId, setBarberId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  // ✅ Fetch barbers list
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await fetch(
          "http://206.189.130.102:5001/api/v1/users/barbers/all-barbers"
        );
        const data = await res.json();
        setBarbers(data.barbers || []);
        if (data.barbers?.length > 0) {
          setBarberId(data.barbers[0]._id); // default barber
        }
      } catch (err) {
        console.error("Error fetching barbers:", err);
      }
    };
    fetchBarbers();
  }, []);

  // ✅ Fetch services list (instead of static)
  useEffect(() => {
    const fetchServices = async () => {
  try {
    const res = await fetch("http://206.189.130.102:5001/api/v1/users/services/getAllService");
    const data = await res.json();
    console.log("Services API Response:", data); 

    // Adjust depending on response shape
    if (Array.isArray(data)) {
      setServices(data);
      setServiceId(data[0]?._id || "");
    } else if (data.services) {
      setServices(data.services);
      setServiceId(data.services[0]?._id || "");
    } else if (data.data?.services) {
      setServices(data.data.services);
      setServiceId(data.data.services[0]?._id || "");
    } else {
      setServices([]);
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  }
};

    fetchServices();
  }, []);

  // ✅ Fetch available slots whenever barber or date changes
  useEffect(() => {
    if (!barberId || !date) return;

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);

        const res = await fetch(
          "http://206.189.130.102:5001/api/v1/users/appointments/get-timeslots",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              barberId,
              date,
            }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setAvailableSlots(data.availableSlots || []);
          setTime(data.availableSlots[0] || "");
        } else {
          setAvailableSlots([]);
          console.error("Failed to fetch slots:", data.message);
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [barberId, date]);

  // ✅ Book appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://206.189.130.102:5001/api/v1/users/appointments/book-appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            barberId,
            serviceId,
            adults,
            children,
            date,
            time,
            name,
            mobile,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("✅ Appointment booked successfully!");
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error booking appointment");
    }
  };

  // ✅ Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 120, once: false });
    AOS.refresh();
  }, []);

  return (
    <div>
      <Header />
      <main id="main">
        <section id="hero" className="hero section dark-background">
          <img
            src="assets/img/hero-bg.jpg"
            alt="Hero Background"
            data-aos="fade-in"
          />
          <div className="container">
            <div className="row">
              {/* Booking Form */}
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <div className="card rounded-4">
                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit} className="booking-form">
                      <div className="row">
                        {/* Service */}
                        <div className="col-12 mb-4">
                          <label className="mb-2">Service</label>
                          <select
                            className="form-select"
                            value={serviceId}
                            onChange={(e) => setServiceId(e.target.value)}
                          >
                            {services.length > 0 ? (
                              services.map((s) => (
                                <option key={s._id} value={s._id}>
                                  {s.name}
                                </option>
                              ))
                            ) : (
                              <option>No services available</option>
                            )}
                          </select>
                        </div>

                        {/* Barber */}
                        <div className="col-12 mb-4">
                          <label className="mb-2">Select Barber</label>
                          <select
                            className="form-select"
                            value={barberId}
                            onChange={(e) => setBarberId(e.target.value)}
                          >
                            {barbers.map((b) => (
                              <option key={b._id} value={b._id}>
                                {b.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Adults */}
                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Adults</label>
                          <div className="counter-box border">
                            <button
                              type="button"
                              onClick={() =>
                                setAdults(Math.max(0, adults - 1))
                              }
                            >
                              -
                            </button>
                            <div className="w-100">{adults}</div>
                            <button
                              type="button"
                              onClick={() => setAdults(adults + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Children</label>
                          <div className="counter-box border">
                            <button
                              type="button"
                              onClick={() =>
                                setChildren(Math.max(0, children - 1))
                              }
                            >
                              -
                            </button>
                            <div className="w-100">{children}</div>
                            <button
                              type="button"
                              onClick={() => setChildren(children + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* Date */}
                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Select Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>

                        {/* Time */}
                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Select Time</label>
                          {loadingSlots ? (
                            <p>Loading slots...</p>
                          ) : (
                            <select
                              className="form-select"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            >
                              {availableSlots.length > 0 ? (
                                availableSlots.map((slot, i) => (
                                  <option key={i} value={slot}>
                                    {slot}
                                  </option>
                                ))
                              ) : (
                                <option>No slots available</option>
                              )}
                            </select>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="form-group mb-4">
                        <label className="mb-2">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      {/* Mobile */}
                      <div className="form-group mb-4">
                        <label className="mb-2">Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          required
                        />
                      </div>

                      {/* Agent */}
                      <div className="form-group mb-4">
                        <label className="mb-2">Select Agent</label>
                        <div className="agent-list">
                          {["Any Agent", "Katelyn", "Gloria"].map((a, i) => (
                            <div
                              key={i}
                              className={`agent-card ${
                                agent === a ? "active" : ""
                              }`}
                              onClick={() => setAgent(a)}
                            >
                              <i className="bi bi-person-circle"></i>
                              <p className="text-dark">{a}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button type="submit" className="submit-btn w-100">
                        BOOK NOW
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Hero Text */}
              <div className="col-lg-6 d-flex align-items-center justify-content-center">
                <div>
                  <h2 data-aos="fade-up" data-aos-delay="100">
                    Real Man’s to go Real Beards.
                  </h2>
                  <h6 data-aos="fade-up" data-aos-delay="200">
                    We are team of talented designers making websites with
                    Bootstrap
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ClientsSection />
        <AboutSection />
        <ServicesSection />
        <section id="features" className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Features</h2>
            <p>
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>
        </section>
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientsSection from '../components/ClientsSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from "../components/ServicesSection";
import Gallery from "../components/Gallery";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";


const Home = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [barbers, setBarbers] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [barberId, setBarberId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceIds, setServiceIds] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Fetch barbers
  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await fetch("http://206.189.130.102:5001/api/v1/users/barbers/all-barbers");
        const data = await res.json();
        setBarbers(data.barbers || []);
        if (data.barbers?.length > 0) {
          setBarberId(data.barbers[0]._id);
        }
      } catch (err) {
        console.error("Error fetching barbers:", err);
      }
    };
    fetchBarbers();
  }, []);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://206.189.130.102:5001/api/v1/users/services/getAllService");
        const data = await res.json();
        if (Array.isArray(data)) setServices(data);
        else if (data.services) setServices(data.services);
        else if (data.data?.services) setServices(data.data.services);
        else setServices([]);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  // Fetch available slots when barber/date/services change
  useEffect(() => {
    if (!barberId || !date || selectedServices.length === 0) {
      setAvailableSlots([]);
      setStartTime("");
      setEndTime("");
      return;
    }

    const fetchSlots = async () => {
      if (!barberId || !date || !serviceIds?.length) {
        console.warn("Missing required parameters for fetching slots");
        return;
      }

      try {
        setLoadingSlots(true);

        const res = await fetch(
          "http://localhost:5001/api/v1/users/appointments/get-timeslots",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ barberId, date, serviceIds }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          const serviceDuration = calculateTotalDuration(selectedServices);

          // Filter slots according to required duration
          const filteredSlots = (data?.availableSlots || []).filter((slot) => {
            const [sh, sm] = slot.start.split(":").map(Number);
            const [eh, em] = slot.end.split(":").map(Number);
            const slotMinutes = eh * 60 + em - (sh * 60 + sm);
            return slotMinutes >= serviceDuration;
          });

          if (filteredSlots.length > 0) {
            setAvailableSlots(filteredSlots);

            // Default selection (first slot)
            setStartTime(filteredSlots[0].start);
            setEndTime(filteredSlots[0].end);
          } else {
            setAvailableSlots([]);
            setStartTime("");
            setEndTime("");
          }
        } else {
          console.error("Failed to fetch slots:", data?.message || "Unknown error");
          setAvailableSlots([]);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };


    fetchSlots();
  }, [barberId, date, selectedServices, serviceIds]);

  // Book appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameError || mobileError) {
      alert("Kindly check your Name and Mobile Number details.");
      return;
    }
    if (!selectedSlot) {
      alert("Please select a valid slot");
      return;
    }

    const payload = {
      barberId,
      serviceIds,
      date,
      time: selectedSlot.start,   // ✅ only start time send to backend
      name,
      mobile,
    };

    console.log("📤 Booking payload:", payload);

    try {
      const res = await fetch("http://localhost:5001/api/v1/users/appointments/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error booking appointment");

      console.log("✅ Appointment booked:", data);
      alert("Appointment booked successfully!");
      // Reset
      setSelectedServices([]);
      setServiceIds([]);
      setDate("");
      setSelectedSlot(null);
      setName("");
      setMobile("");
    } catch (err) {
      console.error("❌ Booking error:", err);
      alert(err.message);
    }
  };


  // AOS init
  useEffect(() => {
    AOS.init({ duration: 1000, offset: 120, once: false });
    AOS.refresh();
  }, []);

  // Select service
  const handleSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;
    const service = services.find((s) => s._id === selectedId);
    if (!service) return;
    if (!selectedServices.some((s) => s._id === service._id)) {
      setSelectedServices([...selectedServices, service]);
      setServiceIds([...serviceIds, service._id]);
    }
    e.target.value = "";
  };

  // Remove service
  const handleRemove = (id) => {
    setSelectedServices(selectedServices.filter((s) => s._id !== id));
    setServiceIds(serviceIds.filter((sid) => sid !== id));
  };

  // Calculate total duration in minutes
  const calculateTotalDuration = (services) => {
    return services.reduce((total, s) => {
      if (!s || !s.duration) return total;
      let dur = 0;
      // handle "1 hour" or "1 hr" & "30", "30 mins"
      if (typeof s.duration === "string" && s.duration.match(/\d+/)) {
        const num = parseInt(s.duration.match(/\d+/)[0], 10);
        if (/hour|hr/i.test(s.duration)) dur = num * 60;
        else dur = num;
      } else if (typeof s.duration === "number") {
        dur = s.duration;
      }
      return total + dur;
    }, 0);
  };

  // Validate Name
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (!/^[A-Za-z ]+$/.test(value)) {
      setNameError("Name should contain only letters and spaces");
    } else if (value.length < 2) {
      setNameError("Name must be at least 2 characters");
    } else {
      setNameError("");
    }
  };

  // Validate Mobile
  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);

    if (!/^[0-9]+$/.test(value)) {
      setMobileError("Mobile number should contain only digits");
    } else if (value.length !== 10) {
      setMobileError("Mobile number must be 10 digits");
    } else {
      setMobileError("");
    }
  };

  const handleDateChange = (e) => {
    const selected = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (selected < today) {
      alert("You cannot book appointment for past dates.");
      setDate(""); // reset field
      return;
    }

    setDate(selected);
  };


  return (
    <div>
      <Header />
      <main id="main">
        <section id="hero" className="hero section dark-background">
          <img src="assets/img/hero-bg.jpg" alt="Hero Background" data-aos="fade-in" />
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
                          <select className="form-select" value="" onChange={handleSelect}>
                            <option value="">-- Select a service --</option>
                            {services.length > 0 ? services.map((s) => (
                              <option key={s._id} value={s._id}>{s.name} ({s.duration})</option>
                            )) : <option>No services available</option>}
                          </select>

                          {/* Selected services */}
                          <div className="mt-3 d-flex flex-wrap gap-2">
                            {selectedServices.map((s) => (
                              <div key={s._id} className="badge bg-primary d-flex align-items-center gap-2" style={{ fontSize: "14px", padding: "8px" }}>
                                {s.name} ({s.duration})
                                <span style={{ cursor: "pointer" }} onClick={() => handleRemove(s._id)}>❌</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Barber */}
                        <div className="col-12 mb-4">
                          <label className="mb-2">Select Barber</label>
                          <select className="form-select" value={barberId} onChange={(e) => setBarberId(e.target.value)}>
                            {barbers.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
                          </select>
                        </div>

                        {/* Date & Time */}
                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Select Date</label>
                          <input
                            type="date"
                            className="form-control"
                            value={date}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => {
                              const today = new Date().toISOString().split("T")[0];
                              if (e.target.value < today) {
                                alert("Past dates are not allowed!");
                                return; // ❌ reject
                              }
                              setDate(e.target.value); // ✅ accept
                            }}
                          />
                        </div>

                        {/* ⏰ Time Slot Select */}
                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Select Time</label>
                          {loadingSlots ? (
                            <p>Loading slots...</p>
                          ) : availableSlots.length > 0 ? (
                            <select
                              className="form-select"
                              value={selectedSlot?.start || ""}   // ✅ value = slot.start
                              onChange={(e) => {
                                const slot = availableSlots.find(s => s.start === e.target.value);
                                setSelectedSlot(slot);
                              }}
                            >
                              <option value="">-- Select a slot --</option>
                              {availableSlots.map((slot, idx) => (
                                <option key={idx} value={slot.start}>
                                  {slot.start} - {slot.end}   {/* ✅ display both, send only start */}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <p>No available slots for selected services</p>
                          )}
                        </div>

                        {/* Name & Mobile */}
                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Your Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={handleNameChange}
                            required
                          />
                          {nameError && <small className="text-danger">{nameError}</small>}
                        </div>

                        <div className="col-lg-6 form-group mb-4">
                          <label className="mb-2">Mobile</label>
                          <input
                            type="text"
                            className="form-control"
                            value={mobile}
                            onChange={handleMobileChange}
                            maxLength={10}
                            required
                          />
                          {mobileError && <small className="text-danger">{mobileError}</small>}
                        </div>

                      </div>

                      <button type="submit" className="submit-btn w-100">BOOK NOW</button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Hero Text */}
              <div className="col-lg-6 d-flex align-items-center justify-content-center">
                <div>
                  <h2 data-aos="fade-up" data-aos-delay="100">Real Man’s to go Real Beards.</h2>
                  <h6 data-aos="fade-up" data-aos-delay="200">We are team of talented designers making websites with Bootstrap</h6>
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
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          </div>
        </section>
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

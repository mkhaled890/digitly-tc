import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Contact.css";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Contact() {
  // Form input states
  const location = useLocation();
  const incoming = location.state;

  // Map clicked service/component to the exact <select> option value
  const getInitialTopic = () => {
    if (!incoming) return "Custom PC Build";
    if (incoming.category === "Components")
      return "Component Pricing & Sourcing";
    if (incoming.title === "Hardware Diagnostics & Thermal Cleanup")
      return "Diagnostics & Cleanup";
    if (incoming.title === "BIOS & Memory XMP Tuning")
      return "BIOS & XMP Tuning";
    return "Custom PC Build";
  };
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState(getInitialTopic);
  const [message, setMessage] = useState(
    incoming?.title ? `I would like to inquire about: ${incoming.title}` : "",
  );

  // Tracks form submission confirmation
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setInquiryType("Custom PC Build");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="contactPage">
      {/* Header Section */}
      <section className="contactHeader">
        <span className="sectionTag">GET IN TOUCH</span>
        <h1>
          Book a Build or{" "}
          <span className="blueHighlight">Consult an Engineer</span>
        </h1>
        <p>
          Have a custom parts list ready, need hardware diagnostics, or want a
          quote for a full workstation build? Send your specs to Digitly TC.
        </p>
      </section>

      {/* Two-Column Contact Layout */}
      <section className="contactGrid">
        {/* Left Column: Direct Studio Info */}
        <div className="contactInfoCard">
          <h2>Digitly TC Studio</h2>
          <p className="infoSubtext">
            Reach out directly for custom assembly bookings, thermal cleanups,
            or component sourcing inquiries.
          </p>

          <div className="infoList">
            <div className="infoItem">
              <div className="infoIconBox">
                <LocationOnIcon style={{ color: "#2563eb", fontSize: 22 }} />
              </div>
              <div>
                <h4>Workshop Location</h4>
                <p>Sin El Fil, Beirut, Lebanon</p>
              </div>
            </div>

            <div className="infoItem">
              <div className="infoIconBox">
                <EmailIcon style={{ color: "#2563eb", fontSize: 22 }} />
              </div>
              <div>
                <h4>Engineering Desk</h4>
                <p>support@digitlytc.com</p>
              </div>
            </div>

            <div className="infoItem">
              <div className="infoIconBox">
                <AccessTimeIcon style={{ color: "#2563eb", fontSize: 22 }} />
              </div>
              <div>
                <h4>Build & Diagnostics Hours</h4>
                <p>Mon – Sat • 10:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="contactFormCard">
          {submitted ? (
            <div className="successState">
              <CheckCircleIcon style={{ fontSize: 54, color: "#2563eb" }} />
              <h3>Inquiry Received</h3>
              <p>
                Thanks, <strong>{fullName}</strong>! A Digitly TC technician has
                logged your <strong>{inquiryType}</strong> request and will
                reply to <strong>{email}</strong> shortly.
              </p>
              <button type="button" className="submitBtn" onClick={handleReset}>
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="inquiryForm">
              <div className="inputGroup">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="inputGroup">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="inputGroup">
                <label htmlFor="inquiryType">Service or Topic</label>
                <select
                  id="inquiryType"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                >
                  <option value="Custom PC Build">
                    Custom Workstation / Gaming PC Build
                  </option>
                  <option value="Diagnostics & Cleanup">
                    Hardware Diagnostics & Thermal Cleanup
                  </option>
                  <option value="BIOS & XMP Tuning">
                    BIOS & Memory XMP Tuning
                  </option>
                  <option value="Component Sourcing">
                    Component Pricing & Sourcing
                  </option>
                </select>
              </div>

              <div className="inputGroup">
                <label htmlFor="messageBox">Build Specs or Question</label>
                <textarea
                  id="messageBox"
                  rows="4"
                  required
                  placeholder="Share your budget, target games/software, or parts list..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="submitBtn">
                <SendIcon style={{ fontSize: 18 }} />
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Contact;

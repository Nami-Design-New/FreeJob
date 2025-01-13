import React from "react";

const ContactForm = () => {
  return (
    <form className="p-4">
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Full Name</label>
          <input
            style={{ backgroundColor: "#E8FAF4" }}
            type="text"
            className="form-control border-0"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email Address</label>
          <input
            style={{ backgroundColor: "#E8FAF4" }}
            type="email"
            className="form-control border-0"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <div className="input-group">
          <select
            className="form-select border-0"
            style={{
              maxWidth: "80px",
              marginRight: "20px",
              backgroundColor: "#E8FAF4",
            }}
          >
            <option value="+1">+1 (US)</option>
            <option value="+44">+44 (UK)</option>
          </select>
          <input
            style={{ backgroundColor: "#E8FAF4" }}
            type="text"
            className="form-control border-0"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Message</label>
        <textarea
          style={{ backgroundColor: "#E8FAF4" }}
          className="form-control border-0"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-success w-100">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;

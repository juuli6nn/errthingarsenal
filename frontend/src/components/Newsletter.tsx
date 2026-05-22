import React from 'react';
import './Newsletter.css';

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-overlay"></div>
      
      <div className="newsletter-bg-text">
        <span>Always Forward,</span>
        <span>For The Arsenal.</span>
      </div>

      <div className="newsletter-modal">
        <div className="newsletter-header">
          <img src="/Images/GUNNER%20LOGO%20RED.png" alt="Arsenal Gunner Logo" className="newsletter-logo" />
          <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
        </div>

        <form className="newsletter-form-horizontal" onSubmit={(e) => e.preventDefault()}>
          <input type="email" className="form-input" placeholder="Enter your email address..." required />
          <button type="submit" className="newsletter-submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;

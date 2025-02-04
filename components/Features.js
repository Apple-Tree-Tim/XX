// components/Features.js
import React from 'react';
import { FaTrophy, FaShieldAlt, FaFolderOpen, FaShippingFast } from 'react-icons/fa';

export default function Features() {
  const features = [
    {
      title: 'Top-Tier Selection of Models and Exclusive Content',
      text: (
        <>
          We offer a unique collection containing the full{' '}
          <span className="highlight">OnlyFans</span> of over{' '}
          <span className="highlight">5,000 models</span> and hundreds of amateur compilations.
        </>
      ),
      icon: <FaTrophy className="feature-icon" />
    },
    {
      title: 'Simple, Secure, and Hassle-Free',
      text: (
        <>
          Enjoy browsing our content library without fear of malicious entities.
          All content is in <span className="highlight">100% safe mega.nz folders</span>.
        </>
      ),
      icon: <FaShieldAlt className="feature-icon" />
    },
    {
      title: 'Browse Packs from Your Favorite Categories',
      text: (
        <>
          From <span className="highlight">OnlyFans</span> to
          <span className="highlight"> Snapchat</span> and
          <span className="highlight"> Celebrity</span>—if you can imagine it, we have it.
          Discover new categories with ease.
        </>
      ),
      icon: <FaFolderOpen className="feature-icon" />
    },
    {
      title: 'Request New Models & Enjoy Lightning-Fast Delivery',
      text: (
        <>
          We take pride in delivering <span className="highlight">model</span> and
          <span className="highlight"> pack</span> requests quickly.
          Just ask and we’ll take care of the rest.
        </>
      ),
      icon: <FaShippingFast className="feature-icon" />
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        <h2 className="features-title">Why Choose OnlyHub?</h2>
        <p className="features-subtitle">
          Discover our core benefits and why thousands trust OnlyHub.
        </p>

        <div className="feature-grid">
          {features.map((feat, i) => (
            <div className="feature-card" key={i}>
              {feat.icon}
              <h3>{feat.title}</h3>
              <p>{feat.text}</p>
            </div>
          ))}
        </div>

        {/* CTA extra ao final, caso deseje */}
        <div style={{ marginTop: '2rem' }}>
          <a href="#pricing" className="btn btn-primary">
            Start Now
          </a>
        </div>
      </div>
    </section>
  );
}

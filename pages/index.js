import { useState, useEffect } from "react";
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';   // Mantém Layout (com Navbar, Footer)
import Pricing from '../components/Pricing';
import ReviewAutoScroll from '../components/ReviewAutoScroll';
import Features from '../components/Features';
import Previews from '../components/Previews';

export default function Home() {
  const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Layout>
      <Head>
        <title>OnlyHub - Exclusive Onlyfans leaks Content</title>
        <meta
          name="description"
          content="Curated content tiers for your pleasure. With over 5,000+ Models, 50TB+ of content and Instant Delivery, we are sure to have what you are looking for."
        />
        <link rel="icon" href="/icon.svg" type="image/x-icon" />
      </Head>

      {/* HERO SECTION */}
      <section className="hero-section inset-0 bg-opacity-50 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}>
        <div className="hero-container">
          <h1 className="hero-title">
            Best Onlyfans Leaks content tiers <br />
            <span className="highlight-hero">for your pleasure</span>
          </h1>
          <p className="hero-subtitle">
            With over <span className="highlight-hero">5,000+ Models</span>, <span className="highlight-hero">50TB+</span> of content and <span className="highlight-hero">Instant Delivery</span>, we are sure to have what you&apos;re looking for.
          </p>
          <div className="hero-btn-group">
            <a href="#pricing" className="btn btn-primary">
              Get Started
            </a>
            <a href="#previews" className="btn btn-light">
              Free Preview
            </a>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <Pricing />

      {/* REVIEWS - auto-scrolling carousel */}
      <ReviewAutoScroll />

      {/* FEATURES */}
      <Features />

      {/* PREVIEWS */}
      <Previews />
    </Layout>
  );
}

import React from 'react';
import { FaStar } from 'react-icons/fa';
import Marquee from "react-fast-marquee";

export default function ReviewAutoScroll() {
  const reviews = [
    { rating: 5, text: "The content was way better than I expected. Totally worth it!", author: "@ Lucas, US" },
    { rating: 5, text: "Huge variety of models and everything is so easy to access.", author: "@ Sarah, UK" },
    { rating: 4, text: "Had a small issue at first, but support was very quick to help me out.", author: "@ Liam, CA" },
    { rating: 5, text: "I was skeptical, but it's absolutely real. I'm really impressed!", author: "@ David, US" },
    { rating: 5, text: "They update new models constantly. Definitely hooked now!", author: "@ Maria, ES" },
    { rating: 5, text: "Fast delivery, secure links, and amazing content. Thumbs up!", author: "@ James, AU" },
    { rating: 5, text: "I was surprised by the quality and how quickly everything was delivered.", author: "@ Ella, US" },
    { rating: 5, text: "This is seriously the best purchase I've made. No regrets at all.", author: "@ Ben, US" },
    { rating: 5, text: "Community is friendly, and you can even request specific models.", author: "@ Mike, NL" },
    { rating: 5, text: "All trending models are here, plus hidden gems I never knew about. Highly recommended!", author: "@ Brian, GB" },
  ];

  return (
    <section className="review-section" id="reviews">
      <div className="container">
        <h2 className="review-title">Customer Reviews</h2>
        <p className="review-subtitle">
          Don&apos;t just take our word for it. See what other customers think about us.
        </p>
        <Marquee autoFill={true} className='containerCarouselSkills' pauseOnHover={true} gradient={true} gradientColor="#181818">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={i} color="#FFD700" />
                ))}
              </div>
              <p className="review-text">{review.text}</p>
              <p className="review-author">{review.author}</p>
            </div>
          ))}
        </Marquee>
        <Marquee direction='right' autoFill={true} className='containerCarouselSkills' pauseOnHover={true} gradient={true} gradientColor="#181818">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={i} color="#FFD700" />
                ))}
              </div>
              <p className="review-text">{review.text}</p>
              <p className="review-author">{review.author}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
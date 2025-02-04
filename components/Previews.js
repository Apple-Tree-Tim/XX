// components/Previews.js
import React, { useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { SITE_CONFIG } from '../config';

export default function Previews() {
  // Array de 4 booleans, cada um controla se o SPOILER está visível
  const [spoilerVisible, setSpoilerVisible] = useState([true, true, true, true]);

  // Função para "clique" no overlay
  const handleSpoilerClick = (index) => {
    const updated = [...spoilerVisible];
    updated[index] = false; // Oculta o overlay daquele vídeo
    setSpoilerVisible(updated);
  };

  return (
    <section id="previews" className="preview-section">
      <div className="container">
        <h2>Exclusive Teasers</h2>
        <p>
          Tap the videos to reveal a sneak peek. Join our Discord for even more hidden gems!
        </p>

        <div className="preview-grid">
          {[1, 2, 3, 4].map((num, index) => (
            <div key={num} className="preview-video">
              {/* Vídeo em autoplay, loop e muted */}
              <video
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={`/videos/v${num}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {spoilerVisible[index] && (
                <div
                  className="spoiler-overlay"
                  onClick={() => handleSpoilerClick(index)}
                >
                  <span>Click to Reveal</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botão Join Discord (usando link do config.js) */}
        <a
          href={SITE_CONFIG.discordLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ marginTop: '2rem', gap: '0.5rem', display: 'inline-flex' }}
        >
          <FaDiscord />
          Join our Discord
        </a>

        {/* CTA final */}
        <div style={{ marginTop: '1.5rem' }}>
          <a href="#pricing" className="btn btn-light">
            Unlock Full Access
          </a>
        </div>
      </div>
    </section>
  );
}

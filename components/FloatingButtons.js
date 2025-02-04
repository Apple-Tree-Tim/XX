// components/FloatingButtons.js
import React from 'react';
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import { SITE_CONFIG } from '../config';

export default function FloatingButtons() {
  return (
    <div className="floating-buttons">
      <a
        href={SITE_CONFIG.discordLink}
        className="floating-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaDiscord />
      </a>
      <a
        href={SITE_CONFIG.telegramLink}
        className="floating-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTelegramPlane />
      </a>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export function SignatureIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let seen = false;
    try {
      seen = sessionStorage.getItem('simar-intro') === 'seen';
    } catch {
      /* Storage can be unavailable in private browsers. */
    }
    if (seen || preference.matches || window.location.hash) return;
    const entrance = window.setTimeout(() => setVisible(true), 0);
    const timer = window.setTimeout(() => setVisible(false), 4000);
    try {
      sessionStorage.setItem('simar-intro', 'seen');
    } catch {
      /* The intro still works without storage. */
    }
    const dismiss = () => setVisible(false);
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Tab') dismiss();
    };
    window.addEventListener('keydown', escape);
    preference.addEventListener('change', dismiss);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(entrance);
      window.removeEventListener('keydown', escape);
      preference.removeEventListener('change', dismiss);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="signature-intro"
      aria-label="Simar Ahuja signature introduction"
    >
      <svg
        className="signature"
        viewBox="15 25 595 160"
        aria-labelledby="signature-title"
      >
        <title id="signature-title">simar ahuja</title>
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="signature-first"
            pathLength="1"
            d="M78 78 C74 67 57 73 58 85 C59 96 78 95 75 108 C72 123 48 121 42 113 M75 108 C85 117 98 91 104 80 L94 108 C91 121 105 119 117 101 L129 80 L119 113 C126 94 142 74 148 81 C152 85 143 101 141 113 C150 94 165 77 170 83 C176 90 156 119 171 118 C179 117 187 105 196 92 C210 72 226 77 217 96 C210 113 190 125 188 113 C184 98 208 73 222 82 L213 108 C208 126 226 116 237 99 L247 80 L237 115 C244 96 254 79 264 82 C269 85 265 92 260 93 C261 110 274 119 290 103"
          />
          <path
            className="signature-last"
            pathLength="1"
            d="M325 98 C341 72 360 75 351 96 C343 117 324 126 322 111 C322 97 345 73 356 83 L346 109 C341 124 357 117 368 102 C386 79 405 35 394 37 C382 37 366 103 366 115 C374 95 391 76 397 82 C404 89 385 112 396 117 C406 122 420 94 425 82 L417 106 C410 128 431 117 444 82 L435 108 C430 125 449 114 461 96 L470 81 C460 113 450 155 436 155 C420 155 442 130 462 118 C481 108 487 91 498 84 C516 71 524 82 513 102 C503 120 488 123 488 110 C488 96 511 75 520 84 L511 109 C505 133 551 105 584 99"
          />
          <g className="signature-dots" fill="currentColor" stroke="none">
            <circle cx="109" cy="63" r="2.6" />
            <circle cx="475" cy="63" r="2.6" />
          </g>
          <path
            className="signature-underline"
            pathLength="1"
            d="M189 170 C310 160 443 160 568 163"
          />
        </g>
      </svg>
    </div>
  );
}

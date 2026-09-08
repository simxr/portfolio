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
    const timer = window.setTimeout(() => setVisible(false), 3500);
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
        viewBox="0 0 660 180"
        aria-labelledby="signature-title"
      >
        <title id="signature-title">simar ahuja</title>
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            className="signature-first"
            pathLength="1"
            d="M38 112 C54 109 73 91 78 78 C85 62 64 64 60 79 C56 92 79 93 73 108 C67 123 43 121 42 112 C41 105 54 102 65 107 C85 120 98 91 104 80 L94 108 C91 121 105 119 117 101 L129 80 L119 113 C126 94 142 74 148 81 C152 85 143 101 141 113 C150 94 165 77 170 83 C176 90 156 119 171 118 C179 117 187 105 196 92 C210 72 226 77 217 96 C210 113 190 125 188 113 C184 98 208 73 222 82 L213 108 C208 126 226 116 237 99 L247 80 C235 112 239 113 247 96 C258 73 270 77 264 88 C260 95 258 105 267 110 C274 114 284 108 290 103"
          />
          <path
            className="signature-last"
            pathLength="1"
            d="M325 98 C341 72 360 75 351 96 C343 117 324 126 322 111 C322 97 345 73 356 83 L346 109 C341 124 357 117 368 102 C386 79 405 35 394 37 C382 37 366 103 366 115 C374 95 391 76 397 82 C404 89 385 112 396 117 C406 122 420 94 425 82 L417 106 C410 128 431 117 444 82 L435 108 C430 125 449 114 461 96 L470 81 C460 113 450 155 436 155 C420 155 442 130 462 118 C481 108 487 91 498 84 C516 71 524 82 513 102 C503 120 488 123 488 110 C488 96 511 75 520 84 L511 109 C505 133 551 105 584 99"
          />
          <path className="signature-dots" d="M108 64 l1 -2 M474 64 l1 -2" />
          <path
            className="signature-underline"
            pathLength="1"
            d="M189 146 C299 129 432 130 568 133"
          />
        </g>
      </svg>
      <button
        type="button"
        className="intro-skip"
        onClick={() => setVisible(false)}
      >
        Skip intro <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}

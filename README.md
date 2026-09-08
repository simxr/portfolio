# Simar Ahuja — Portfolio

Orange, ink, and oversized typography. Built with React, TypeScript, and Vinext.

## Development

Use Node.js 24, then run `npm ci` and `npm run dev`.
Run `npm run lint` and `npm run build` before publishing.
The existing GitHub Actions workflow publishes pushes to `main` to GitHub Pages.

## Resume

The download links are configured for `public/resume.pdf`. Add your final PDF
there before publishing; the download will be unavailable until that file exists.
The base-path prefix is preserved for GitHub Pages.

## Motion

The signature intro runs once per tab session for 4 seconds. Escape or Tab dismisses it,
and is omitted for anchor links and reduced-motion preferences. To replay it,
open a new tab or clear the `simar-intro` session-storage key.
The footer motion toggle pauses decorative animations; operating-system
reduced-motion preferences also disable motion and smooth scrolling.
The single AHUJA footer gently grows on scroll in browsers supporting CSS scroll
timelines, with a static fallback in other browsers.

# Simar Ahuja — Portfolio

Orange, ink, and oversized typography. Built with React, TypeScript, and Vinext.

## Development

Use Node.js 24, then run `npm ci` and `npm run dev`.
Run `npm run lint` and `npm run build` before publishing.
The existing GitHub Actions workflow publishes pushes to `main` to GitHub Pages.

## Resume

The download currently serves `public/resume.txt`, a text version of the supplied
resume. To use your final PDF, add `public/resume.pdf`, change `resumePath` in
`app/page.tsx` to end in `/resume.pdf`, and update the `TXT` badge to `PDF`.
Keep the base-path prefix so downloads work on GitHub Pages.

## Motion

The signature intro runs once per tab session for 3.5 seconds. It can be skipped,
and is omitted for anchor links and reduced-motion preferences. To replay it,
open a new tab or clear the `simar-intro` session-storage key.
The footer motion toggle pauses decorative animations; operating-system
reduced-motion preferences also disable motion and smooth scrolling.

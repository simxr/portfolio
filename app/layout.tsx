import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      'https://simar-ahuja-cloud.simarahuja2307.chatgpt.site',
  ),
  title: 'Simar Ahuja | Cloud Automation Engineer',
  description: 'Cloud automation engineer building secure AWS, EKS, Terraform, and GitOps systems.',
  openGraph: {
    title: 'Simar Ahuja | Cloud Automation Engineer',
    description: 'Secure cloud foundations across AWS, EKS, Terraform, and GitOps.',
    type: 'website',
    images: [{ url: '/og.png', width: 1736, height: 907, alt: 'Simar Ahuja, Cloud Automation Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simar Ahuja | Cloud Automation Engineer',
    description: 'Secure cloud foundations across AWS, EKS, Terraform, and GitOps.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

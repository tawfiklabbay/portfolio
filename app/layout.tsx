import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://tawfiklabbay.dev"),
  title: {
    default: "Tawfik Labbay — Cyber Security Engineer & Full Stack Developer",
    template: "%s | Tawfik Labbay",
  },
  description:
    "Tawfik Labbay is a Cyber Security Engineer, Full Stack Developer, and Ethical Hacker building real-world security solutions and award-winning projects.",
  keywords: [
    "Tawfik Labbay",
    "Cyber Security Engineer",
    "Full Stack Developer",
    "Ethical Hacker",
    "Penetration Testing",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Tawfik Labbay" }],
  creator: "Tawfik Labbay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tawfiklabbay.dev",
    siteName: "Tawfik Labbay",
    title: "Tawfik Labbay — Cyber Security Engineer & Full Stack Developer",
    description:
      "Building real-world security solutions and award-winning full-stack applications.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tawfik Labbay Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tawfik Labbay — Cyber Security Engineer & Full Stack Developer",
    description: "Building real-world security solutions and award-winning applications.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tawfik Labbay",
  url: "https://tawfiklabbay.dev",
  jobTitle: "Cyber Security Engineer & Full Stack Developer",
  description:
    "Cyber Security Engineer, Full Stack Developer, and Ethical Hacker building real-world security solutions.",
  knowsAbout: [
    "Cyber Security",
    "Penetration Testing",
    "Full Stack Development",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
  ],
  sameAs: [
    "https://github.com/tawfiklabbay",
    "https://linkedin.com/in/tawfiklabbay",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[#050505] antialiased">
        {/* Global noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* App */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

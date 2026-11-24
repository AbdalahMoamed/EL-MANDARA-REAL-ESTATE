import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import MobileStickyBar from '../components/MobileStickyBar';
import { siteConfig } from '../data/site-config';

export const metadata: Metadata = {
  metadataBase: new URL('https://compoundgoldenview.com'),
  title: {
    default: siteConfig.seo.homeTitle,
    template: '%s | Compound Golden View',
  },
  description: siteConfig.seo.homeDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: 'El Mandara Real Estate' }],
  creator: 'El Mandara Real Estate',
  publisher: 'El Mandara Real Estate',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    url: 'https://compoundgoldenview.com',
    siteName: 'Compound Golden View – Suez',
    locale: 'ar_EG',
    type: 'website',
    images: [
      {
        url: '/images/project/main-project-rendering.png',
        width: 1200,
        height: 630,
        alt: 'كمبوند جولدن فيو السويس 24 أكتوبر',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeDescription,
    images: ['/images/project/main-project-rendering.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Real Estate Organization Schema Markup (JSON-LD)
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://compoundgoldenview.com/#organization',
        name: 'El Mandara Real Estate',
        alternateName: 'شركة المندرة للتسويق العقاري',
        url: 'https://compoundgoldenview.com',
        logo: 'https://compoundgoldenview.com/images/brand/golden-view-logo.png',
        telephone: siteConfig.primaryCallNumber,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'منطقة 24 أكتوبر بجوار مرور السويس والمجمع الطبي',
          addressLocality: 'السويس',
          addressRegion: 'محافظة السويس',
          addressCountry: 'EG',
        },
        sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl],
      },
      {
        '@type': 'Place',
        '@id': 'https://compoundgoldenview.com/#project',
        name: 'Compound Golden View',
        description: siteConfig.seo.homeDescription,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '29.9734',
          longitude: '32.5312',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'السويس',
          addressCountry: 'EG',
        },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className="bg-white text-slate-800 min-h-screen flex flex-col font-cairo antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyBar />
      </body>
    </html>
  );
}

import React from 'react';
import { Helmet } from 'react-helmet-async';

/*
  Reusable SEO component for per-route metadata.
  Usage:
  <SEO title="Page Title" description="Description." path="/route" />
*/

// Allow overriding base URL via env (e.g., production custom domain) else fallback
const BASE_URL = process.env.REACT_APP_SITE_URL || 'https://studymateplus.vercel.app';
const DEFAULT_TITLE = 'StudyMatePlus – Learn Smarter';
const DEFAULT_DESC = 'StudyMatePlus: notes, PYQs, syllabus, mind maps, feedback & mentorship resources to help students learn smarter.';
const DEFAULT_IMAGE = `${BASE_URL}/studymatelogo.png`;

export function SEO({ title, description, path = '/', image = DEFAULT_IMAGE, noIndex = false }) {
  const metaTitle = title ? `${title} | StudyMatePlus` : DEFAULT_TITLE;
  const metaDesc = description || DEFAULT_DESC;
  const canonical = `${BASE_URL}${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonical} />
      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />
      {/* Structured Data only on homepage to reduce duplicate schema */}
      {path === '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'StudyMatePlus',
            url: BASE_URL,
            logo: `${BASE_URL}/studymatelogo.png`,
            description: DEFAULT_DESC,
            sameAs: ['https://github.com/lovelymahor/StudyMatePlus']
          })}
        </script>
      )}
    </Helmet>
  );
}

export default SEO;

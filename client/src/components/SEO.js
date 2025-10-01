import React from 'react';
import { Helmet } from 'react-helmet-async';

/*
  Reusable SEO component for per-route metadata.
  Usage:
  <SEO title="Page Title" description="Description." path="/route" />
*/

const BASE_URL = 'https://studymateplus.vercel.app';
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
    </Helmet>
  );
}

export default SEO;

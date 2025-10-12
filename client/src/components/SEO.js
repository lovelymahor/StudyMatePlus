import { useEffect } from "react";

/**
 * SEO component to set document title, meta description, canonical, and social tags.
 * Props:
 * - title: string
 * - description: string
 * - canonicalPath: string (e.g., "/about")
 * - image: string (absolute or root-relative path)
 * - noindex: boolean (adds robots noindex,nofollow)
 */
export default function SEO({ title, description, canonicalPath, image = "/studymatelogo.png", noindex = false }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setTag = (selector, attr, value) => {
      if (!value) return;
      let el = document.head.querySelector(selector);
      if (!el) {
        const nameAttr = selector.includes('[name="') ? 'name' : selector.includes('[property="') ? 'property' : null;
        el = document.createElement('meta');
        if (nameAttr) {
          const match = selector.match(/\[(name|property)="([^"]+)"\]/);
          if (match) el.setAttribute(match[1], match[2]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      setTag('meta[name="description"]', 'content', description);
    }

    if (noindex) {
      setTag('meta[name="robots"]', 'content', 'noindex, nofollow');
    }

    const origin = window.location.origin;
    const canonicalHref = canonicalPath
      ? (canonicalPath.startsWith('http') ? canonicalPath : origin + canonicalPath)
      : origin + window.location.pathname;

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    // Open Graph
    setTag('meta[property="og:title"]', 'content', title);
    setTag('meta[property="og:description"]', 'content', description);
    const ogUrl = canonicalHref;
    setTag('meta[property="og:url"]', 'content', ogUrl);
    setTag('meta[property="og:image"]', 'content', image.startsWith('http') ? image : origin + image);

    // Twitter
    setTag('meta[name="twitter:title"]', 'content', title);
    setTag('meta[name="twitter:description"]', 'content', description);
    setTag('meta[name="twitter:image"]', 'content', image.startsWith('http') ? image : origin + image);
  }, [title, description, canonicalPath, image, noindex]);

  return null;
}

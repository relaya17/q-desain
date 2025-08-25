import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'iq-design - אדריכלות יוקרה באילת',
  description = 'תכנון ועיצוב בתים יוקרתיים באילת - שירותי אדריכלות מקצועיים עם דגש על איכות ויוקרה',
  image = 'https://iq-design.netlify.app/og-image.jpg',
  url,
  type = 'website'
}) => {
  const location = useLocation();
  const currentUrl = url || `https://iq-design.netlify.app${location.pathname}`;

  useEffect(() => {
    // עדכון כותרת העמוד
    document.title = title;

    // עדכון meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateNameTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', type);

    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:url', currentUrl);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Meta description
    updateNameTag('description', description);

  }, [title, description, image, currentUrl, type]);

  return null; // קומפוננטה זו לא מציגה כלום
};

export default SEO;

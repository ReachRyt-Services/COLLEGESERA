import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    schema?: Record<string, any> | Array<Record<string, any>>;
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
}

const BASE_DOMAIN = "https://collegesera.com";

const SEO = ({
    title,
    description = "Find the best colleges in India. Compare fees, courses, placements, and reviews.",
    keywords = "colleges, universities, admission, engineering, medical, mba, india",
    image = "/og-image.png",
    url,
    type = 'website',
    schema,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription
}: SEOProps) => {
    const location = useLocation();

    // Enforce clean, lowercase, self-referencing canonical URL without query strings or trailing slashes
    const cleanPath = location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const canonicalUrl = url || `${BASE_DOMAIN}${cleanPath}`;
    const hasQueryParams = Boolean(location.search && location.search.length > 0);
    
    // Globally fetch SEO overrides for the current clean path
    const { data: seoOverride } = useQuery({
        queryKey: ['seo_override', cleanPath],
        queryFn: async () => {
            const { data } = await supabase
                .from('sitemap_entries')
                .select('seo_title, seo_description, og_image, notes')
                .eq('loc', cleanPath)
                .maybeSingle();
            return data;
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    const activeTitle = seoOverride?.seo_title || title;
    const activeDesc = seoOverride?.seo_description || description;
    const rawKeywords = seoOverride?.notes || keywords;
    const activeKeywords = rawKeywords
        ? rawKeywords
            .replace(/\blanding\s*page\b/gi, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/,\s*,/g, ',')
            .replace(/^\s*,\s*|\s*,\s*$/g, '')
            .trim()
        : keywords;
    const rawImage = seoOverride?.og_image || image;
    const activeImage = rawImage.startsWith('http') 
        ? rawImage 
        : `${BASE_DOMAIN}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

    const siteTitle = "Collegesera";
    const fullTitle = activeTitle.includes("|") ? activeTitle : `${activeTitle} | ${siteTitle}`;

    const finalOgTitle = seoOverride?.seo_title || ogTitle || fullTitle;
    const finalOgDesc = seoOverride?.seo_description || ogDescription || activeDesc;
    const finalTwitterTitle = seoOverride?.seo_title || twitterTitle || fullTitle;
    const finalTwitterDesc = seoOverride?.seo_description || twitterDescription || activeDesc;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={activeDesc} />
            <meta name="keywords" content={activeKeywords} />
            
            {/* Self-referencing clean canonical tag (Rules 1, 2, 3, 6, 7) */}
            <link rel="canonical" href={canonicalUrl} />
            {hasQueryParams && (
                <meta name="robots" content="noindex, follow" />
            )}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={finalOgTitle} />
            <meta property="og:description" content={finalOgDesc} />
            <meta property="og:image" content={activeImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={finalTwitterTitle} />
            <meta name="twitter:description" content={finalTwitterDesc} />
            <meta name="twitter:image" content={activeImage} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;

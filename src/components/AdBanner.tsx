import { useEffect, useState } from 'react';
import { getAds } from '@/services/collegeService';
import { DatabaseAdvertisement } from '@/types/database';
import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
    placement: string;
    className?: string;
    adData?: DatabaseAdvertisement;
    children?: React.ReactNode;
}

const AdBanner = ({ placement, className = '', adData }: AdBannerProps) => {
    const [ad, setAd] = useState<DatabaseAdvertisement | null>(adData || null);
    const [loading, setLoading] = useState(!adData);

    useEffect(() => {
        if (adData) {
            setAd(adData);
            return;
        }

        const fetchAd = async () => {
            try {
                const ads = await getAds(placement);
                if (ads.length > 0) {
                    setAd(ads[0]);
                }
            } catch (error) {
                console.error("Failed to fetch ad", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [placement, adData]);

    if (loading) return null; // Or a skeleton
    if (!ad) return null;

    const ensureAbsoluteUrl = (url: string) => {
        if (!url) return '#';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    const targetUrl = ensureAbsoluteUrl(ad.link_url);

    return (
        <div className={`relative group overflow-hidden ${className}`}>
            <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                    if (targetUrl && targetUrl !== '#') {
                        e.preventDefault();
                        window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }
                }}
                className="block relative"
            >

                <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white flex items-center gap-2 font-medium">
                        Visit Site <ExternalLink className="w-4 h-4" />
                    </div>
                </div>
            </a>
        </div>
    );
};

export default AdBanner;

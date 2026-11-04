
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SecurityUtils } from '@/utils/securityUtils';
import { validateRoute } from '@/utils/security';

interface RouteValidatorProps {
  children: React.ReactNode;
}

const RouteValidator = ({ children }: RouteValidatorProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Enhanced route validation
    if (!validateRoute(path)) {
      SecurityUtils.secureLog('Invalid route pattern detected', { path });
      navigate('/404', { replace: true });
      return;
    }

    // Validate college slug and subpath format with enhanced security
    const collegeMatch = path.match(/^\/college\/([^\/]+)(?:\/([^\/]+))?$/);
    if (collegeMatch) {
      const slug = collegeMatch[1];
      const subpath = collegeMatch[2];
      if (!/^[a-z0-9-]+$/.test(slug) || slug.length > 100 || slug.length < 1) {
        SecurityUtils.secureLog('Invalid college slug format', { slug });
        navigate('/404', { replace: true });
        return;
      }
      if (subpath && (!/^[a-z0-9-]+$/.test(subpath) || subpath.length > 50)) {
        SecurityUtils.secureLog('Invalid college subpath format', { subpath });
        navigate('/404', { replace: true });
        return;
      }
    }

    // Enhanced admin routes validation
    if (path.startsWith('/secure-portal')) {
      const validPrefixes = [
        '/secure-portal',
        '/secure-portal/leads',
        '/secure-portal/colleges',
        '/secure-portal/analytics',
        '/secure-portal/seo',
        '/secure-portal/articles',
        '/secure-portal/scholarships',
        '/secure-portal/settings'
      ];

      const isValid = validPrefixes.some(prefix =>
        path === prefix || path.startsWith(`${prefix}/`)
      );

      if (!isValid) {
        SecurityUtils.secureLog('Invalid admin route access attempt', { path });
        navigate('/404', { replace: true }); // Redirect to 404 instead of unauthorized
        return;
      }
    }

    // Log route access for security monitoring (non-sensitive routes only)
    const publicRoutes = ['/', '/colleges', '/about', '/contact', '/articles'];
    if (publicRoutes.includes(path) || path.startsWith('/college/')) {
      SecurityUtils.secureLog('Route accessed', { path });
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
};

export default RouteValidator;

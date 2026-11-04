
import { SecurityUtils } from './securityUtils';

/**
 * Legacy security functions - migrated to SecurityUtils
 * @deprecated Use SecurityUtils instead
 */

export const sanitizeInput = (input: string): string => {
  return SecurityUtils.sanitizeText(input);
};

export const isValidSlug = (slug: string): boolean => {
  if (!slug || typeof slug !== 'string') return false;
  // allow: letters, numbers, hyphens, underscores, percent-encoding
  return /^[a-zA-Z0-9-_%]+$/.test(slug);
};


export const isValidEmail = (email: string): boolean => {
  return SecurityUtils.isValidEmail(email);
};

export const isValidAdminRole = (role: string): boolean => {
  return SecurityUtils.isValidAdminRole(role);
};

export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

export const checkRateLimit = (key: string, maxRequests: number, windowMs: number): boolean => {
  return SecurityUtils.checkRateLimit(key, maxRequests, windowMs);
};

/**
 * Enhanced route validation
 */
export const validateRoute = (path: string): boolean => {
  if (!path || typeof path !== 'string') return false;
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /\.\./,           // Directory traversal
    /%/,              // URL encoding attempts
    /[<>]/,           // HTML injection
    /javascript:/i,   // JavaScript protocol
    /data:/i,         // Data protocol
    /vbscript:/i,     // VBScript protocol
    /file:/i,         // File protocol
    /\0/,             // Null bytes
    /[^\x20-\x7E]/,   // Non-printable characters
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(path));
};

/**
 * Content Security Policy headers
 */
export const getSecurityHeaders = () => {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://api.clerk.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.clerk.dev https://clerk.dev;",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };
};

/**
 * Validate advertisement data for XSS prevention
 */
export const validateAdvertisementData = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  const requiredFields = ['title', 'image_url', 'target_url', 'cta_text'];
  const hasAllFields = requiredFields.every(field => data[field] && typeof data[field] === 'string');
  
  if (!hasAllFields) return false;
  
  // Validate URL fields
  const urlFields = ['image_url', 'target_url'];
  const validUrls = urlFields.every(field => {
    const url = data[field];
    return /^https?:\/\/.+/.test(url) && !url.includes('<') && !url.includes('>');
  });
  
  return validUrls;
};

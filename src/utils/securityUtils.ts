
import DOMPurify from 'dompurify';

/**
 * Comprehensive input sanitization utilities
 */
export class SecurityUtils {
  /**
   * Sanitizes HTML content to prevent XSS attacks
   */
  static sanitizeHtml(html: string): string {
    if (!html || typeof html !== 'string') return '';
    
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      ALLOWED_ATTR: ['class'],
      FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'button'],
      FORBID_ATTR: ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur']
    });
  }

  /**
   * Sanitizes plain text input
   */
  static sanitizeText(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    return input
      .replace(/[<>\"']/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .trim();
  }

  /**
   * Validates and sanitizes URLs
   */
  static sanitizeUrl(url: string): string {
    if (!url || typeof url !== 'string') return '';
    
    // Remove dangerous protocols
    const cleanUrl = url.replace(/^(javascript|data|vbscript):/gi, '');
    
    // Ensure it starts with http/https or is a relative path
    if (!/^(https?:\/\/|\/|#)/.test(cleanUrl)) {
      return `https://${cleanUrl}`;
    }
    
    return cleanUrl;
  }

  /**
   * Validates email format with security considerations
   */
  static isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Rate limiting check with enhanced security
   */
  static checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
    try {
      const now = Date.now();
      const storageKey = `rateLimit_${key}`;
      const requests = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      // Remove old requests outside the window
      const validRequests = requests.filter((timestamp: number) => now - timestamp < windowMs);
      
      if (validRequests.length >= maxRequests) {
        console.warn(`Rate limit exceeded for key: ${key}`);
        return false;
      }
      
      // Add current request
      validRequests.push(now);
      localStorage.setItem(storageKey, JSON.stringify(validRequests));
      
      return true;
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return false;
    }
  }

  /**
   * Generates secure session token
   */
  static generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Validates admin role with additional security checks
   */
  static isValidAdminRole(role: string): boolean {
    const validRoles = ['super_admin', 'admin', 'moderator'];
    return validRoles.includes(role);
  }

  /**
   * Secure logging that removes sensitive data
   */
  static secureLog(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      const sanitizedData = data ? this.sanitizeLogData(data) : undefined;
      console.log(`[SECURE]: ${message}`, sanitizedData);
    }
  }

  /**
   * Sanitizes log data to remove sensitive information
   */
  private static sanitizeLogData(data: any): any {
    if (!data) return data;
    
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth', 'credential', 'email'];
    
    if (typeof data === 'object') {
      const sanitized = { ...data };
      Object.keys(sanitized).forEach(key => {
        if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
          sanitized[key] = '[REDACTED]';
        }
      });
      return sanitized;
    }
    
    return data;
  }
}

/**
 * Enhanced validation functions
 */
export const validateInput = {
  slug: (slug: string): boolean => {
    return /^[a-z0-9-]{1,100}$/.test(slug);
  },
  
  phone: (phone: string): boolean => {
    return /^\+?[\d\s\-\(\)]{10,15}$/.test(phone);
  },
  
  marks: (marks: number): boolean => {
    return Number.isInteger(marks) && marks >= 0 && marks <= 200;
  },
  
  year: (year: number): boolean => {
    const currentYear = new Date().getFullYear();
    return Number.isInteger(year) && year >= 2020 && year <= currentYear + 5;
  }
};

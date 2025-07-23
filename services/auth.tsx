// src/services/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret';

export const AuthService = {
  generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  },

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  },

  storeAuthData(token: string, tenantId: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('tenantId', tenantId);
      document.cookie = `accessToken=${token}; path=/; max-age=3600; SameSite=Lax; Secure`;
      document.cookie = `tenantId=${tenantId}; path=/; max-age=3600; SameSite=Lax`;
    }
  },

  clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tenantId');
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'tenantId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  getAuthHeaders(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    
    const token = localStorage.getItem('accessToken');
    const tenantId = localStorage.getItem('tenantId');
    
    return {
      'Authorization': `Bearer ${token}`,
      'X-Tenant-ID': tenantId || ''
    };
  }
};
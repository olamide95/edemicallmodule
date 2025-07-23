// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Enhanced token and tenant management
const getAuthData = () => {
  if (typeof window === 'undefined') return { token: null, tenantId: null };
  
  const token = localStorage.getItem('accessToken') || 
                document.cookie.match(/accessToken=([^;]+)/)?.[1];
  const tenantId = document.cookie.match(/tenantId=([^;]+)/)?.[1];
  
  return { token, tenantId };
};

const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('accessToken');
  document.cookie = 'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'tenantId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'userRole=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const api = {
  async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const { token, tenantId } = getAuthData();
    
    console.log(`[API] ${method} ${endpoint}`, { 
      tenantId,
      hasData: !!data,
      hasToken: !!token 
    });

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(tenantId && { 'X-Tenant-Id': tenantId }), // Send tenant ID in headers
        ...headers,
      },
      credentials: 'include',
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || response.statusText;
        
        console.error(`[API Error] ${method} ${endpoint}:`, {
          status: response.status,
          message: errorMessage,
          tenantId
        });
        
        throw new ApiError(errorMessage, response.status);
      }

      const responseData = await response.json();
      
      console.log(`[API Success] ${method} ${endpoint}`, {
        status: response.status,
        tenantId,
        data: responseData
      });
      
      return {
        success: true,
        data: responseData,
        status: response.status
      };
    } catch (error) {
      console.error(`[API Failed] ${method} ${endpoint}`, {
        error,
        tenantId
      });
      
      if (error instanceof ApiError && error.status === 401) {
        clearAuthData();
        if (typeof window !== 'undefined') {
          window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        status: error instanceof ApiError ? error.status : 500
      };
    }
  },

  // Enhanced auth methods with better logging
  async login(email: string, password: string): Promise<ApiResponse<{
    accessToken: string;
    tenantId: string;
    branchId: string | null;
    role: string;
  }>> {
    console.log('[Auth] Attempting login for:', email);
    const response = await this.request('POST', '/auth/login', { email, password });
    
    if (response.success && typeof window !== 'undefined') {
      console.log('[Auth] Login successful, storing tokens for tenant:', response.data.tenantId);
      
      localStorage.setItem('accessToken', response.data.accessToken);
      document.cookie = `accessToken=${response.data.accessToken}; Path=/; SameSite=Lax; Secure; Max-Age=86400`;
      document.cookie = `tenantId=${response.data.tenantId}; Path=/; SameSite=Lax; Secure; Max-Age=86400`;
      document.cookie = `userRole=${response.data.role}; Path=/; SameSite=Lax; Secure; Max-Age=86400`;
    } else {
      console.error('[Auth] Login failed:', response.error);
    }
    
    return response;
  },

  async logout(): Promise<ApiResponse> {
    console.log('[Auth] Attempting logout');
    const response = await this.request('POST', '/auth/logout');
    clearAuthData();
    return response;
  },

  // Tenant-aware CRUD methods
  async getSchoolDetails(): Promise<ApiResponse<any>> {
    const { tenantId } = getAuthData();
    console.log('[School] Fetching details for tenant:', tenantId);
    return this.request('GET', '/school-setup/school');
  },

  async updateSchoolDetails(data: any): Promise<ApiResponse<any>> {
    const { tenantId } = getAuthData();
    console.log('[School] Updating details for tenant:', tenantId, data);
    return this.request('PUT', '/school-setup/school', data);
  },

  // Core CRUD methods
  async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint);
  },

  async post<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data);
  },

  async put<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data);
  },

  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  },

  // Enhanced file upload with tenant context
  async uploadSchoolLogo(
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<{ logoUrl: string }>> {
    const { tenantId } = getAuthData();
    console.log('[School] Uploading logo for tenant:', tenantId);
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE_URL}/school-setup/school/logo`);
      
      const token = getAuthData().token;
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      
      xhr.withCredentials = true;
      
      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress(Math.round((event.loaded / event.total) * 100));
          }
        };
      }
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            console.log('[School] Logo upload success:', data);
            resolve({
              success: true,
              data,
              status: xhr.status
            });
          } catch (error) {
            console.error('[School] Logo upload parse error:', error);
            reject(new ApiError('Invalid response format', xhr.status));
          }
        } else {
          console.error('[School] Logo upload failed:', xhr.statusText);
          reject(new ApiError(xhr.statusText, xhr.status));
        }
      };
      
      xhr.onerror = () => {
        console.error('[School] Logo upload network error');
        reject(new ApiError('Network error', 0));
      };
      
      xhr.send(formData);
    });
  }
};
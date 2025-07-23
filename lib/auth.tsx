// src/lib/auth.ts
export class AuthService {
  static async login(email: string, password: string, role: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return await response.json();
  }

  static async checkSession() {
    const response = await fetch('/api/auth/session', {
      credentials: 'include'
    });
    return response.ok;
  }

  static async logout() {
    await fetch('/api/auth/logout', {
      credentials: 'include'
    });
  }
}
const API_BASE_URL = 'http://localhost:5001/api';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface OrderData {
  items: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  total: number;
  tip: number;
}

class ApiService {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async login(data: LoginData) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.token);
    }
    return result;
  }

  async register(data: RegisterData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.token);
    }
    return result;
  }

  async validateToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const response = await fetch(`${API_BASE_URL}/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.ok) {
      return response.json();
    } else {
      localStorage.removeItem('token');
      return null;
    }
  }

  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  }

  async createOrder(data: OrderData) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders()
    };
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async getMyOrders() {
    const headers = this.getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers
    });
    return response.json();
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export const apiService = new ApiService();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface FetchOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Products
  async getProducts(params?: {
    category?: string;
    featured?: boolean;
    bestseller?: boolean;
    limit?: number;
    offset?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.bestseller) searchParams.set('bestseller', 'true');
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const query = searchParams.toString();
    return this.request<{ products: any[] }>(
      `/api/products${query ? `?${query}` : ''}`
    );
  }

  async getProduct(slug: string) {
    return this.request<{ product: any }>(`/api/products/${slug}`);
  }

  async createProduct(data: any, token?: string) {
    return this.request<{ product: any }>('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  async updateProduct(slug: string, data: any, token?: string) {
    return this.request<{ product: any }>(`/api/products/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    });
  }

  async deleteProduct(slug: string, token?: string) {
    return this.request<{ success: boolean }>(`/api/products/${slug}`, {
      method: 'DELETE',
      token,
    });
  }

  // Orders
  async createOrder(data: any, token: string) {
    return this.request<{ order: any }>('/api/orders', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  async getOrders(params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }, token?: string) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.offset) searchParams.set('offset', params.offset.toString());

    const query = searchParams.toString();
    return this.request<{ orders: any[] }>(
      `/api/orders${query ? `?${query}` : ''}`,
      { token }
    );
  }

  // Checkout
  async processCheckout(data: any) {
    return this.request<{
      success: boolean;
      message: string;
      payment_intent_id: string;
    }>('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Instacart
  async createInstacartOrder(data: any) {
    return this.request<{
      success: boolean;
      message: string;
      instacart_order_id: string;
      tracking_url: string;
    }>('/api/instacart', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getInstacartOrderStatus(orderId: string) {
    return this.request<{
      order_id: string;
      status: string;
      tracking_url: string;
    }>(`/api/instacart?order_id=${orderId}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

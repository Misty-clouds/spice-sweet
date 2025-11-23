export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          image_url: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          price: number
          compare_at_price: number | null
          category_id: string
          images: string[]
          stock: number
          weight: string | null
          ingredients: string | null
          dietary_info: string[]
          featured: boolean
          bestseller: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          price: number
          compare_at_price?: number | null
          category_id: string
          images?: string[]
          stock?: number
          weight?: string | null
          ingredients?: string | null
          dietary_info?: string[]
          featured?: boolean
          bestseller?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          price?: number
          compare_at_price?: number | null
          category_id?: string
          images?: string[]
          stock?: number
          weight?: string | null
          ingredients?: string | null
          dietary_info?: string[]
          featured?: boolean
          bestseller?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string
          email: string
          full_name: string | null
          phone: string | null
          address: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          full_name?: string | null
          phone?: string | null
          address?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          address?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          order_number: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          subtotal: number
          tax: number
          shipping: number
          items: Json
          shipping_address: Json
          billing_address: Json
          payment_method: string | null
          payment_status: string
          instacart_order_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          order_number: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          subtotal: number
          tax: number
          shipping: number
          items: Json
          shipping_address: Json
          billing_address: Json
          payment_method?: string | null
          payment_status?: string
          instacart_order_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          order_number?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total?: number
          subtotal?: number
          tax?: number
          shipping?: number
          items?: Json
          shipping_address?: Json
          billing_address?: Json
          payment_method?: string | null
          payment_status?: string
          instacart_order_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'customer'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: 'admin' | 'customer'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'customer'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

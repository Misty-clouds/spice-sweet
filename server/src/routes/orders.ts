import { Router, Response } from 'express';
import { AuthRequest, authenticateUser } from '../middleware/auth';
import { generateOrderNumber } from '../utils';

const router = Router();

// POST /api/orders - Create a new order
router.post('/', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const supabaseClient = req.supabase;
    const user = req.user;

    // Get or create customer
    let { data: customer } = await supabaseClient
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!customer) {
      const { data: newCustomer, error: customerError } = await supabaseClient
        .from('customers')
        .insert([
          {
            user_id: user.id,
            email: user.email,
          },
        ])
        .select()
        .single();

      if (customerError) {
        return res.status(500).json({ error: customerError.message });
      }

      customer = newCustomer;
    }

    // Create order
    const orderData = {
      customer_id: customer.id,
      order_number: generateOrderNumber(),
      total: req.body.total,
      subtotal: req.body.subtotal,
      tax: req.body.tax || 0,
      shipping: req.body.shipping || 0,
      items: req.body.items,
      shipping_address: req.body.shipping_address,
      billing_address: req.body.billing_address || req.body.shipping_address,
      payment_method: req.body.payment_method,
      payment_status: 'pending',
      status: 'pending',
    };

    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) {
      return res.status(500).json({ error: orderError.message });
    }

    return res.status(201).json({ order });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders - Get orders (user's own or all if admin)
router.get('/', authenticateUser, async (req: AuthRequest, res: Response) => {
  try {
    const supabaseClient = req.supabase;
    const user = req.user;
    const { status, limit = '50', offset = '0' } = req.query;

    // Check if user is admin
    const { data: userRole } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    let query = supabaseClient
      .from('orders')
      .select('*, customers(email, full_name)')
      .range(
        parseInt(offset as string),
        parseInt(offset as string) + parseInt(limit as string) - 1
      )
      .order('created_at', { ascending: false });

    // If not admin, only show their own orders
    if (userRole?.role !== 'admin') {
      const { data: customer } = await supabaseClient
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (customer) {
        query = query.eq('customer_id', customer.id);
      }
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: orders, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

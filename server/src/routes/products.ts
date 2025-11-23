import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { AuthRequest, optionalAuth } from '../middleware/auth';

const router = Router();

// GET /api/products - Get all products with filters
router.get('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { category, featured, bestseller, limit = '50', offset = '0' } = req.query;

    let query = supabase
      .from('products')
      .select('*, categories(name, slug)')
      .range(
        parseInt(offset as string),
        parseInt(offset as string) + parseInt(limit as string) - 1
      );

    if (category && category !== 'all') {
      query = query.eq('categories.slug', category);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (bestseller === 'true') {
      query = query.eq('bestseller', true);
    }

    const { data: products, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/products - Create a new product
router.post('/', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .insert([req.body])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:slug - Get a single product by slug
router.get('/:slug', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('slug', slug)
      .single();

    if (error || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/products/:slug - Update a product
router.put('/:slug', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const { data: product, error } = await supabase
      .from('products')
      .update(req.body)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/products/:slug - Delete a product
router.delete('/:slug', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const { error } = await supabase.from('products').delete().eq('slug', slug);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

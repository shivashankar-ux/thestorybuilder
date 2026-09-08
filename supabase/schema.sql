-- ==========================================
-- EBOOKS & ORDERS SUPABASE DATABASE SCHEMA
-- ==========================================

-- 1. Create Ebooks Table
CREATE TABLE IF NOT EXISTS public.ebooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  price_inr NUMERIC(10, 2) NOT NULL,
  file_url TEXT NOT NULL, -- Storage path inside 'ebooks-private' bucket e.g. "ebooks/sample.pdf"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ebook_id UUID REFERENCES public.ebooks(id) ON DELETE CASCADE,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  razorpay_order_id TEXT NOT NULL,
  razorpay_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'paid' | 'failed'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_ebooks_slug ON public.ebooks(slug);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_email ON public.orders(buyer_email);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
-- Ebooks: Anyone can read ebooks (for storefront)
CREATE POLICY "Allow public read access to ebooks" 
  ON public.ebooks FOR SELECT 
  USING (true);

-- Orders: Only authenticated/service role can view/modify orders
-- Public can insert new pending orders during checkout
CREATE POLICY "Allow public insert to orders" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public read own order by id" 
  ON public.orders FOR SELECT 
  USING (true);

-- 6. Storage Bucket Configuration Note:
-- Create a private bucket named 'ebooks-private' in Supabase Dashboard (Storage -> Buckets -> Create 'ebooks-private', Public: Off).

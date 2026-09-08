-- ==========================================
-- EBOOKS SEED DATA (SAMPLE EBOOKS)
-- ==========================================

INSERT INTO public.ebooks (title, slug, description, cover_image_url, price_inr, file_url)
VALUES 
(
  'The 7-Day Web Design & Conversion Blueprint',
  '7-day-web-design-blueprint',
  'The exact blueprint used by high-converting digital agencies to build, launch, and monetize premium custom websites in 7 days flat.',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  499.00,
  'ebooks/7-day-web-design-blueprint.pdf'
),
(
  'Performance Marketing Playbook for Founders',
  'performance-marketing-playbook',
  'Master Meta & Google Ads without burning budget. Learn audience targeting, creative testing framework, and scale ROAS predictably.',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  799.00,
  'ebooks/performance-marketing-playbook.pdf'
),
(
  'Brand Authority & Storybuilding Masterclass',
  'brand-authority-masterclass',
  'Craft compelling brand messaging, high-status visual identity, and positions that command premium pricing in crowded markets.',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80',
  599.00,
  'ebooks/brand-authority-masterclass.pdf'
)
ON CONFLICT (slug) DO NOTHING;

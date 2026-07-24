-- ============================================================
-- PhotoAI Studio - Supabase Row-Level Security Policies
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shooting_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.on_site_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.postprocess_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Users
-- ============================================================
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- Projects
-- ============================================================
CREATE POLICY "projects_crud_own" ON public.projects
    FOR ALL USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Images
-- ============================================================
CREATE POLICY "images_crud_own" ON public.images
    FOR ALL USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow service role to insert images for guests (user_id can be null initially)
CREATE POLICY "images_insert_service" ON public.images
    FOR INSERT WITH CHECK (true);  -- Auth handled at API level

-- ============================================================
-- AI Reports
-- ============================================================
CREATE POLICY "ai_reports_select_own" ON public.ai_reports
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ai_reports_insert_service" ON public.ai_reports
    FOR INSERT WITH CHECK (true);  -- Auth handled at API level

-- ============================================================
-- Shooting Plans
-- ============================================================
CREATE POLICY "shooting_plans_crud_own" ON public.shooting_plans
    FOR ALL USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- On-Site Assessments
-- ============================================================
CREATE POLICY "on_site_assessments_crud_own" ON public.on_site_assessments
    FOR ALL USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Post-Process Guides
-- ============================================================
CREATE POLICY "postprocess_guides_crud_own" ON public.postprocess_guides
    FOR ALL USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- Portfolios
-- ============================================================
CREATE POLICY "portfolios_crud_own" ON public.portfolios
    FOR ALL USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow public read for published portfolios
CREATE POLICY "portfolios_select_published" ON public.portfolios
    FOR SELECT USING (is_published = true);

-- ============================================================
-- Analysis Cache (shared across all users)
-- ============================================================
CREATE POLICY "analysis_cache_select_public" ON public.analysis_cache
    FOR SELECT USING (true);
CREATE POLICY "analysis_cache_insert_public" ON public.analysis_cache
    FOR INSERT WITH CHECK (true);

-- ============================================================
-- Subscriptions
-- ============================================================
CREATE POLICY "subscriptions_select_own" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- Storage Bucket Policies
-- ============================================================

-- Bucket: user-uploads
-- Allow authenticated users to upload to their own folder
CREATE POLICY "storage_upload_authenticated" ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'user-uploads'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- Allow public read access to uploaded files
CREATE POLICY "storage_read_public" ON storage.objects
    FOR SELECT
    USING (bucket_id IN ('user-uploads', 'portfolios', 'thumbnails'));

-- Allow users to delete their own uploads
CREATE POLICY "storage_delete_own" ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'user-uploads'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

-- ============================================================
-- Auto-create user profile trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, display_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- Migration: Add specialization column + fix course data structure
-- Purpose: Allow each course row to have degree + specialization separately
--          so UI can show:  B.Tech — Computer Science — 4 Years
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================================================

-- ─── Step 1: Add columns ─────────────────────────────────────────────────────
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS specialization character varying,
  ADD COLUMN IF NOT EXISTS intake_seats   integer;

-- ─── Step 2: Normalize existing degree names ─────────────────────────────────
UPDATE public.courses SET name = 'B.E'    WHERE LOWER(TRIM(name)) IN ('b.e.', 'be');
UPDATE public.courses SET name = 'B.Tech' WHERE LOWER(TRIM(name)) IN ('b.tech', 'btech', 'b.tech.');
UPDATE public.courses SET name = 'MBA'    WHERE LOWER(TRIM(name)) IN ('m.b.a', 'master of business administration');
UPDATE public.courses SET name = 'MCA'    WHERE LOWER(TRIM(name)) IN ('m.c.a', 'master of computer applications');
UPDATE public.courses SET name = 'M.Tech' WHERE LOWER(TRIM(name)) IN ('mtech', 'm.tech.');
UPDATE public.courses SET name = 'B.Sc'  WHERE LOWER(TRIM(name)) IN ('bsc', 'bachelor of science', 'b.sc.');
UPDATE public.courses SET name = 'B.Com' WHERE LOWER(TRIM(name)) IN ('bcom', 'bachelor of commerce', 'b.com.');
UPDATE public.courses SET name = 'B.A'   WHERE LOWER(TRIM(name)) IN ('ba', 'bachelor of arts', 'b.a.');
UPDATE public.courses SET name = 'BBA'   WHERE LOWER(TRIM(name)) IN ('bachelor of business administration', 'b.b.a', 'b.b.a.');
UPDATE public.courses SET name = 'BCA'   WHERE LOWER(TRIM(name)) IN ('bachelor of computer applications', 'b.c.a');

-- ─── Step 3: Fix rows where engineering branch was stored as name ─────────────
-- These should be: name='B.E', specialization='Computer Science & Engineering'
UPDATE public.courses
SET specialization = name, name = 'B.E'
WHERE name IN (
  'Computer Science & Engineering',
  'Computer Science and Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electronics and Communication Engineering',
  'Electrical and Electronics Engineering',
  'Information Technology',
  'Aerospace Engineering',
  'Biotechnology',
  'Chemical Engineering',
  'Computer Science',
  'Electronics Engineering',
  'Automobile Engineering',
  'Marine Engineering',
  'Manufacturing Engineering',
  'Production Engineering',
  'Instrumentation Engineering'
);

-- ─── Step 4: Add indexes ──────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_courses_college_id    ON public.courses(college_id);
CREATE INDEX IF NOT EXISTS idx_courses_name          ON public.courses(name);

-- =============================================================================
-- IMPORTANT: After running the above, use the INSERT section below to add
-- specializations for each college's B.E / B.Tech programs.
-- Replace the college_id values with your actual IDs.
-- =============================================================================
-- 
-- HOW TO ADD SPECIALIZATIONS FOR A COLLEGE:
-- Instead of updating the single "B.E" row, INSERT new rows for each branch.
-- Example (replace college_id '112' with your actual IDs):
--
-- First, delete the generic B.E/B.Tech rows for that college:
-- DELETE FROM public.courses WHERE college_id = '112' AND name IN ('B.E', 'B.Tech');
--
-- Then insert specific branches:
-- INSERT INTO public.courses (id, college_id, name, specialization, degree_type, duration, eligibility)
-- VALUES
--   (gen_random_uuid(), '112', 'B.Tech', 'Computer Science & Engineering', 'FULL TIME', '4 Years', '10th & 12th Grade - Maths, Physics, Chemistry'),
--   (gen_random_uuid(), '112', 'B.Tech', 'Mechanical Engineering',          'FULL TIME', '4 Years', '10th & 12th Grade - Maths, Physics, Chemistry'),
--   (gen_random_uuid(), '112', 'B.Tech', 'Civil Engineering',                'FULL TIME', '4 Years', '10th & 12th Grade - Maths, Physics, Chemistry'),
--   (gen_random_uuid(), '112', 'B.Tech', 'Electronics & Communication Engg', 'FULL TIME', '4 Years', '10th & 12th Grade - Maths, Physics, Chemistry'),
--   (gen_random_uuid(), '112', 'B.Tech', 'Electrical & Electronics Engg',    'FULL TIME', '4 Years', '10th & 12th Grade - Maths, Physics, Chemistry'),
--   (gen_random_uuid(), '112', 'MBA',    'Marketing Management',              'REGULAR',   '2 Years', 'Graduation 55%, CAT/MAT/TANCET'),
--   (gen_random_uuid(), '112', 'MBA',    'Finance Management',                'REGULAR',   '2 Years', 'Graduation 55%, CAT/MAT/TANCET'),
--   (gen_random_uuid(), '112', 'MBA',    'Human Resource Management',         'REGULAR',   '2 Years', 'Graduation 55%, CAT/MAT/TANCET');

-- =============================================================================
-- VERIFICATION: Run this after migration to confirm structure
-- =============================================================================
-- SELECT college_id, name, specialization, degree_type, duration
-- FROM public.courses
-- ORDER BY college_id, name, specialization
-- LIMIT 50;

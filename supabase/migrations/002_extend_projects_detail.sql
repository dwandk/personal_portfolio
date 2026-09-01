-- ==============================================================================
-- MIGRATION 002: Extend Projects Table with Full Case-Study Fields
-- Project: Andika Dwi Prasetya Portfolio
-- ==============================================================================

-- Add extended case-study columns to projects table
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS overview        TEXT,
  ADD COLUMN IF NOT EXISTS problem         TEXT,
  ADD COLUMN IF NOT EXISTS research        TEXT,
  ADD COLUMN IF NOT EXISTS process         TEXT,
  ADD COLUMN IF NOT EXISTS solution        TEXT,
  ADD COLUMN IF NOT EXISTS result          TEXT,
  ADD COLUMN IF NOT EXISTS lessons_learned TEXT,
  ADD COLUMN IF NOT EXISTS key_features    TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS timeline        TEXT,
  ADD COLUMN IF NOT EXISTS team_size       TEXT;

-- Note:
-- overview        → Project summary / ringkasan singkat
-- problem         → Problem statement yang ditemukan
-- research        → Metode riset & temuan
-- process         → Alur pengerjaan (Design Thinking, Agile, etc.)
-- solution        → Solusi / desain yang dibuat
-- result          → Hasil / pencapaian (metric, outcome)
-- lessons_learned → Pembelajaran dari project
-- key_features    → Array of key feature strings (menggantikan/melengkapi highlights)
-- timeline        → Duration e.g. "3 Months", "Jan–Mar 2025"
-- team_size       → e.g. "Solo", "3 Members"

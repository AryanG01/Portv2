-- Normalized portfolio schema
-- Run this in the Supabase SQL Editor after dropping the old site_content table.

-- ── Drop old table ──────────────────────────────
DROP TABLE IF EXISTS site_content;

-- ── Profile (single row) ────────────────────────
CREATE TABLE profile (
  id          int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name        text NOT NULL,
  headline    text NOT NULL,
  location    text NOT NULL,
  email       text NOT NULL,
  phone_e164  text NOT NULL,
  github_url  text NOT NULL,
  linkedin_url text NOT NULL
);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON profile FOR SELECT USING (true);

-- ── Education ───────────────────────────────────
CREATE TABLE education (
  id              serial PRIMARY KEY,
  institution     text NOT NULL,
  program         text NOT NULL,
  specializations jsonb DEFAULT '[]',
  dates           text NOT NULL,
  notes           jsonb NOT NULL DEFAULT '[]',
  sort_order      int NOT NULL DEFAULT 0
);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON education FOR SELECT USING (true);

-- ── Experience ──────────────────────────────────
CREATE TABLE experience (
  id          serial PRIMARY KEY,
  company     text NOT NULL,
  role        text NOT NULL,
  dates       text NOT NULL,
  highlights  jsonb NOT NULL DEFAULT '[]',
  sort_order  int NOT NULL DEFAULT 0
);

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON experience FOR SELECT USING (true);

-- ── Projects ────────────────────────────────────
CREATE TABLE projects (
  id          serial PRIMARY KEY,
  name        text NOT NULL,
  context     text NOT NULL,
  summary     text NOT NULL,
  details     jsonb NOT NULL DEFAULT '[]',
  tags        jsonb NOT NULL DEFAULT '[]',
  github      text NOT NULL,
  demo        text,
  case_study  jsonb,
  sort_order  int NOT NULL DEFAULT 0
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);

-- ── Hackathons ──────────────────────────────────
CREATE TABLE hackathons (
  id          serial PRIMARY KEY,
  name        text NOT NULL,
  result      text NOT NULL,
  sort_order  int NOT NULL DEFAULT 0
);

ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON hackathons FOR SELECT USING (true);

-- ── Skills ──────────────────────────────────────
CREATE TABLE skills (
  id          serial PRIMARY KEY,
  name        text NOT NULL,
  category    text NOT NULL CHECK (category IN ('languages', 'frameworks', 'data', 'cloud_and_tools', 'methods')),
  proficiency text CHECK (proficiency IN ('expert', 'proficient', 'familiar', 'learning')),
  sort_order  int NOT NULL DEFAULT 0
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON skills FOR SELECT USING (true);

/**
 * Seed profile.json data into normalized Supabase tables.
 *
 * Usage:
 *   npx tsx scripts/seed-supabase.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * in your .env.local.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  process.env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  console.error("The service role key bypasses RLS and is required for seeding.");
  console.error("Find it in Supabase Dashboard → Settings → API → service_role");
  process.exit(1);
}

const supabase = createClient(url, key);
const profile = JSON.parse(readFileSync(resolve(__dirname, "../data/profile.json"), "utf-8"));

async function seed() {
  console.log("Seeding normalized tables...\n");

  // ── Profile ──────────────────────────────────
  {
    const { error } = await supabase.from("profile").upsert({
      id: 1,
      name: profile.name,
      headline: profile.headline,
      location: profile.location,
      email: profile.contact.email,
      phone_e164: profile.contact.phone_e164,
      github_url: profile.contact.links.github,
      linkedin_url: profile.contact.links.linkedin,
    });
    if (error) throw new Error(`profile: ${error.message}`);
    console.log("✓ profile");
  }

  // ── Education ────────────────────────────────
  {
    await supabase.from("education").delete().gte("id", 0);
    const rows = profile.education.map((e: Record<string, unknown>, i: number) => ({
      institution: e.institution,
      program: e.program,
      specializations: e.specializations ?? [],
      dates: e.dates,
      notes: e.notes,
      sort_order: i,
    }));
    const { error } = await supabase.from("education").insert(rows);
    if (error) throw new Error(`education: ${error.message}`);
    console.log(`✓ education (${rows.length} rows)`);
  }

  // ── Experience ───────────────────────────────
  {
    await supabase.from("experience").delete().gte("id", 0);
    const rows = profile.experience.map((e: Record<string, unknown>, i: number) => ({
      company: e.company,
      role: e.role,
      dates: e.dates,
      highlights: e.highlights,
      sort_order: i,
    }));
    const { error } = await supabase.from("experience").insert(rows);
    if (error) throw new Error(`experience: ${error.message}`);
    console.log(`✓ experience (${rows.length} rows)`);
  }

  // ── Projects ─────────────────────────────────
  {
    await supabase.from("projects").delete().gte("id", 0);
    const rows = profile.projects.map((p: Record<string, unknown>, i: number) => ({
      name: p.name,
      context: p.context,
      summary: p.summary,
      details: p.details,
      tags: p.tags,
      github: p.github,
      demo: p.demo ?? null,
      case_study: p.caseStudy ?? null,
      sort_order: i,
    }));
    const { error } = await supabase.from("projects").insert(rows);
    if (error) throw new Error(`projects: ${error.message}`);
    console.log(`✓ projects (${rows.length} rows)`);
  }

  // ── Hackathons ───────────────────────────────
  {
    await supabase.from("hackathons").delete().gte("id", 0);
    const rows = profile.hackathons_and_awards.map((h: Record<string, unknown>, i: number) => ({
      name: h.name,
      result: h.result,
      sort_order: i,
    }));
    const { error } = await supabase.from("hackathons").insert(rows);
    if (error) throw new Error(`hackathons: ${error.message}`);
    console.log(`✓ hackathons (${rows.length} rows)`);
  }

  // ── Skills ───────────────────────────────────
  {
    await supabase.from("skills").delete().gte("id", 0);

    // Build proficiency lookup: skill name → proficiency level
    const proficiencyMap = new Map<string, string>();
    for (const [level, names] of Object.entries(profile.skillProficiency as Record<string, string[]>)) {
      for (const name of names) {
        proficiencyMap.set(name, level);
      }
    }

    const rows: Record<string, unknown>[] = [];
    let order = 0;
    for (const [category, names] of Object.entries(profile.skills as Record<string, string[]>)) {
      for (const name of names) {
        rows.push({
          name,
          category,
          proficiency: proficiencyMap.get(name) ?? null,
          sort_order: order++,
        });
      }
    }

    const { error } = await supabase.from("skills").insert(rows);
    if (error) throw new Error(`skills: ${error.message}`);
    console.log(`✓ skills (${rows.length} rows)`);
  }

  console.log("\nDone! All tables seeded.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

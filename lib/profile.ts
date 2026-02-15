import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";
import localProfile from "@/data/profile.json";

/* ── Types ─────────────────────────────────── */

export interface CaseStudy {
  problem: string;
  approach: string;
  challenges: string[];
  metrics: string[];
  codeHighlight?: string;
}

export interface Project {
  name: string;
  context: string;
  summary: string;
  details: string[];
  tags: string[];
  github: string;
  demo: string | null;
  caseStudy?: CaseStudy;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  dates: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  program: string;
  specializations?: string[];
  dates: string;
  notes: string[];
}

export interface HackathonAward {
  name: string;
  result: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  location: string;
  contact: {
    email: string;
    phone_e164: string;
    links: {
      linkedin: string;
      github: string;
    };
  };
  education: Education[];
  experience: ExperienceEntry[];
  hackathons_and_awards: HackathonAward[];
  projects: Project[];
  skills: {
    languages: string[];
    frameworks: string[];
    data: string[];
    cloud_and_tools: string[];
    methods: string[];
  };
  skillProficiency: {
    expert: string[];
    proficient: string[];
    familiar: string[];
    learning: string[];
  };
}

/* ── Supabase row types ───────────────────── */

interface ProfileRow {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone_e164: string;
  github_url: string;
  linkedin_url: string;
}

interface ExperienceRow {
  company: string;
  role: string;
  dates: string;
  highlights: string[];
}

interface ProjectRow {
  name: string;
  context: string;
  summary: string;
  details: string[];
  tags: string[];
  github: string;
  demo: string | null;
  case_study: CaseStudy | null;
}

interface HackathonRow {
  name: string;
  result: string;
}

interface SkillRow {
  name: string;
  category: string;
  proficiency: string | null;
}

interface EducationRow {
  institution: string;
  program: string;
  specializations: string[] | null;
  dates: string;
  notes: string[];
}

/* ── Fetcher ───────────────────────────────── */

async function fetchProfile(): Promise<ProfileData> {
  if (!supabase) return localProfile as ProfileData;

  try {
    const [profileRes, educationRes, experienceRes, projectsRes, hackathonsRes, skillsRes] =
      await Promise.all([
        supabase.from("profile").select("*").eq("id", 1).single(),
        supabase.from("education").select("*").order("sort_order"),
        supabase.from("experience").select("*").order("sort_order"),
        supabase.from("projects").select("*").order("sort_order"),
        supabase.from("hackathons").select("*").order("sort_order"),
        supabase.from("skills").select("*").order("sort_order"),
      ]);

    if (profileRes.error || !profileRes.data) {
      console.warn("Supabase profile fetch failed, using local fallback:", profileRes.error?.message);
      return localProfile as ProfileData;
    }

    const p = profileRes.data as ProfileRow;
    const educationRows = (educationRes.data ?? []) as EducationRow[];
    const experienceRows = (experienceRes.data ?? []) as ExperienceRow[];
    const projectRows = (projectsRes.data ?? []) as ProjectRow[];
    const hackathonRows = (hackathonsRes.data ?? []) as HackathonRow[];
    const skillRows = (skillsRes.data ?? []) as SkillRow[];

    // Assemble skills by category
    const skills: ProfileData["skills"] = {
      languages: [],
      frameworks: [],
      data: [],
      cloud_and_tools: [],
      methods: [],
    };
    for (const s of skillRows) {
      const cat = s.category as keyof typeof skills;
      if (cat in skills) skills[cat].push(s.name);
    }

    // Assemble skill proficiency
    const skillProficiency: ProfileData["skillProficiency"] = {
      expert: [],
      proficient: [],
      familiar: [],
      learning: [],
    };
    for (const s of skillRows) {
      if (s.proficiency) {
        const level = s.proficiency as keyof typeof skillProficiency;
        if (level in skillProficiency) skillProficiency[level].push(s.name);
      }
    }

    return {
      name: p.name,
      headline: p.headline,
      location: p.location,
      contact: {
        email: p.email,
        phone_e164: p.phone_e164,
        links: {
          linkedin: p.linkedin_url,
          github: p.github_url,
        },
      },
      education: educationRows.map((e) => ({
        institution: e.institution,
        program: e.program,
        ...(e.specializations ? { specializations: e.specializations } : {}),
        dates: e.dates,
        notes: e.notes,
      })),
      experience: experienceRows.map((e) => ({
        company: e.company,
        role: e.role,
        dates: e.dates,
        highlights: e.highlights,
      })),
      hackathons_and_awards: hackathonRows.map((h) => ({
        name: h.name,
        result: h.result,
      })),
      projects: projectRows.map((pr) => ({
        name: pr.name,
        context: pr.context,
        summary: pr.summary,
        details: pr.details,
        tags: pr.tags,
        github: pr.github,
        demo: pr.demo,
        ...(pr.case_study ? { caseStudy: pr.case_study } : {}),
      })),
      skills,
      skillProficiency,
    };
  } catch {
    console.warn("Supabase unreachable, using local fallback");
    return localProfile as ProfileData;
  }
}

export const getProfile = unstable_cache(fetchProfile, ["profile"], {
  revalidate: 3600,
});

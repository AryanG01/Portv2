"use client";

import { useState, useCallback } from "react";
import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Hackathons from "@/components/sections/hackathons";
import Skills from "@/components/sections/skills";
import Contact from "@/components/sections/contact";
import Leadership from "@/components/sections/leadership";
import Testimonials from "@/components/sections/testimonials";
import NowSection from "@/components/sections/now";
import KeyboardNav from "@/components/keyboard-nav";
import SectionWrapper from "@/components/section-wrapper";
import GitHubActivity from "@/components/github-activity";
import BackgroundEffects from "@/components/background-effects";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import ScrollProgress from "@/components/scroll-progress";
import CustomCursor from "@/components/custom-cursor";
import SkillsMarquee from "@/components/skills-marquee";
import type { ProfileData } from "@/lib/profile";

function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="section-divider" />
    </div>
  );
}

interface PageContentProps {
  profile: ProfileData;
}

export default function PageContent({ profile }: PageContentProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillToggle = useCallback((skill: string) => {
    setActiveSkill((prev) => (prev === skill ? null : skill));
  }, []);

  return (
    <SmoothScrollProvider>
      <BackgroundEffects />
      <ScrollProgress />
      <CustomCursor />
      <KeyboardNav />
      <Nav />
      <main>
        {/* Hero */}
        <Hero profile={profile} />

        <Divider />

        {/* About */}
        <SectionWrapper id="about" title="About">
          <About />
        </SectionWrapper>

        <Divider />

        {/* Now — what I'm focused on */}
        <SectionWrapper id="now" title="Now">
          <NowSection />
        </SectionWrapper>

        <Divider />

        {/* GitHub activity */}
        <GitHubActivity profile={profile} />

        <Divider />

        {/* Experience */}
        <SectionWrapper id="experience" title="Experience">
          <Experience profile={profile} />
        </SectionWrapper>

        <Divider />

        {/* Hackathons & Awards */}
        <SectionWrapper id="awards" title="Hackathons & Awards">
          <Hackathons profile={profile} />
        </SectionWrapper>

        <Divider />

        {/* Skills — marquee + interactive filter */}
        <SectionWrapper id="skills" title="Skills">
          {/* Decorative marquee */}
          <div className="mb-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Technology stack
            </p>
            <SkillsMarquee />
          </div>

          {/* Interactive skill filter (paired with projects) */}
          <div className="border-t pt-8" style={{ borderColor: "rgba(16, 185, 129, 0.08)" }}>
            <h3 className="mb-6 font-heading text-xl font-semibold text-muted">
              Filter projects by skill
            </h3>
            <Skills
              profile={profile}
              activeSkill={activeSkill}
              onSkillToggle={handleSkillToggle}
            />
          </div>
        </SectionWrapper>

        <Divider />

        {/* Projects — bento grid */}
        <SectionWrapper id="projects" title="Projects">
          <Projects profile={profile} activeSkill={activeSkill} />
        </SectionWrapper>

        <Divider />

        {/* Leadership & Extracurricular */}
        <SectionWrapper id="leadership" title="Leadership & Community">
          <Leadership />
        </SectionWrapper>

        <Divider />

        {/* Contact */}
        <SectionWrapper id="contact" title="Get in Touch">
          <Contact profile={profile} />
        </SectionWrapper>
      </main>
    </SmoothScrollProvider>
  );
}

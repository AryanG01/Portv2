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
import KeyboardNav from "@/components/keyboard-nav";
import SectionWrapper from "@/components/section-wrapper";
import BackgroundEffects from "@/components/background-effects";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import ScrollProgress from "@/components/scroll-progress";

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-8">
      <div className="section-divider" />
    </div>
  );
}

export default function PageContent() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillToggle = useCallback((skill: string) => {
    setActiveSkill((prev) => (prev === skill ? null : skill));
  }, []);

  return (
    <SmoothScrollProvider>
      <BackgroundEffects />
      <ScrollProgress />
      <KeyboardNav />
      <Nav />
      <main>
        <Hero />

        <Divider />

        <SectionWrapper id="about" title="About">
          <About />
        </SectionWrapper>

        <Divider />

        <SectionWrapper id="experience" title="Experience">
          <Experience />
        </SectionWrapper>

        <Divider />

        <SectionWrapper id="awards" title="Hackathons & Awards">
          <Hackathons />
        </SectionWrapper>

        <Divider />

        <SectionWrapper id="projects" title="Projects & Skills">
          <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <div>
              <Projects activeSkill={activeSkill} />
            </div>
            <div>
              <div className="lg:sticky lg:top-24">
                <h3 className="mb-6 font-heading text-2xl font-bold gradient-text">Skills</h3>
                <Skills activeSkill={activeSkill} onSkillToggle={handleSkillToggle} />
              </div>
            </div>
          </div>
        </SectionWrapper>

        <Divider />

        <SectionWrapper id="contact" title="Get in Touch">
          <Contact />
        </SectionWrapper>
      </main>
    </SmoothScrollProvider>
  );
}

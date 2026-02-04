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
import SectionWrapper from "@/components/section-wrapper";

export default function PageContent() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillToggle = useCallback((skill: string) => {
    setActiveSkill((prev) => (prev === skill ? null : skill));
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />

        <SectionWrapper id="about" title="About">
          <About />
        </SectionWrapper>

        <SectionWrapper id="experience" title="Experience">
          <Experience />
        </SectionWrapper>

        <SectionWrapper id="projects" title="Projects">
          <Projects activeSkill={activeSkill} />
        </SectionWrapper>

        <SectionWrapper id="awards" title="Hackathons & Awards">
          <Hackathons />
        </SectionWrapper>

        <SectionWrapper id="skills" title="Skills">
          <Skills activeSkill={activeSkill} onSkillToggle={handleSkillToggle} />
        </SectionWrapper>

        <SectionWrapper id="contact" title="Get in Touch">
          <Contact />
        </SectionWrapper>
      </main>
    </>
  );
}

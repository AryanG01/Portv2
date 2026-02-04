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

function Divider() {
  return <div className="section-divider mx-8 md:mx-[6vw] lg:mx-[8vw]" />;
}

export default function PageContent() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillToggle = useCallback((skill: string) => {
    setActiveSkill((prev) => (prev === skill ? null : skill));
  }, []);

  return (
    <>
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

        <SectionWrapper id="projects" title="Projects">
          <Projects activeSkill={activeSkill} />
        </SectionWrapper>

        <Divider />

        <SectionWrapper id="awards" title="Hackathons & Awards">
          <Hackathons />
        </SectionWrapper>

        <Divider />

        <SectionWrapper id="skills" title="Skills">
          <Skills activeSkill={activeSkill} onSkillToggle={handleSkillToggle} />
        </SectionWrapper>

        <Divider />

        <SectionWrapper id="contact" title="Get in Touch">
          <Contact />
        </SectionWrapper>
      </main>
    </>
  );
}

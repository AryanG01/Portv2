"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import SectionWrapper from "@/components/section-wrapper";

export default function PageContent() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

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
          <p className="text-muted">Awards section placeholder</p>
        </SectionWrapper>

        <SectionWrapper id="skills" title="Skills">
          <p className="text-muted">Skills section placeholder</p>
        </SectionWrapper>

        <SectionWrapper id="contact" title="Get in Touch">
          <p className="text-muted">Contact section placeholder</p>
        </SectionWrapper>
      </main>
    </>
  );
}

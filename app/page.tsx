import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import SectionWrapper from "@/components/section-wrapper";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <SectionWrapper id="about" title="About">
          <p className="text-muted">About section placeholder</p>
        </SectionWrapper>

        <SectionWrapper id="experience" title="Experience">
          <p className="text-muted">Experience section placeholder</p>
        </SectionWrapper>

        <SectionWrapper id="projects" title="Projects">
          <p className="text-muted">Projects section placeholder</p>
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

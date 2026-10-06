import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { profile, site, socials, education, contact } from "@/lib/data";

// Structured data (schema.org Person): lets Google tie this site, GitHub and LinkedIn
// to one person, which is what makes name searches show them together.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: `${profile.firstName} ${profile.lastName}`,
  url: site.url,
  image: `${site.url}/main-image.jpg`,
  jobTitle: profile.title,
  description: site.description,
  email: `mailto:${contact.email}`,
  homeLocation: { "@type": "Place", name: contact.location },
  alumniOf: education.map((ed) => ({ "@type": "CollegeOrUniversity", name: ed.institution })),
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" stops any value from closing the script tag early
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

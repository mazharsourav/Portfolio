import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { profile, site, socials, education, contact, projects, skillCategories } from "@/lib/data";

// Structured data (schema.org), linked together with @id. Person lets Google tie this site, GitHub
// and LinkedIn to one person, which is what makes name searches show them together. The project
// list gives search engines and AI tools every project with its stack and links.
const personId = `${site.url}/#person`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.fullName,
      alternateName: `${profile.firstName} ${profile.lastName}`,
      url: site.url,
      image: `${site.url}/main-image.jpg`,
      jobTitle: profile.title,
      description: site.description,
      email: `mailto:${contact.email}`,
      address: { "@type": "PostalAddress", addressLocality: contact.city, addressCountry: contact.countryCode },
      alumniOf: education.map((ed) => ({ "@type": "CollegeOrUniversity", name: ed.institution })),
      knowsAbout: skillCategories.flatMap((c) => c.tags),
      sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: `${profile.fullName} | ${profile.title}`,
      mainEntity: { "@id": personId },
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/#project-list`,
      name: `Projects by ${profile.fullName}`,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        // SoftwareSourceCode, not SoftwareApplication: every project is a public repo, and
        // Google's app rich results require ratings and prices these projects don't have
        item: {
          "@type": "SoftwareSourceCode",
          name: p.title,
          description: p.description,
          codeRepository: p.github,
          url: p.live !== "#" ? p.live : p.github,
          keywords: p.tags.join(", "),
          ...(p.image && { image: `${site.url}${p.image}` }),
          author: { "@id": personId },
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" stops any value from closing the script tag early
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
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

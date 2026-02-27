import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import Projects from "@/components/sections/Projects";
import Events from "@/components/sections/Events";
import Press from "@/components/sections/Press";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIDo />
        <Projects />
        <Events />
        <Press />
        <Contact />
      </main>
    </>
  );
}

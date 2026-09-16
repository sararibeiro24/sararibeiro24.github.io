import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Build from "./components/Build";
import Education from "./components/Education";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Languages from "./components/Languages";
import Volunteering from "./components/Volunteering";
import Socials from "./components/Socials";
import Activities from "./components/Activities";
import Footer from "./components/Footer";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  return (
    <div>
      <NavBar />
      <Hero />
      <Build />
      <Education />
      <Projects onSelect={setSelectedProject} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Experience />
      <Activities />
      <Skills />
      <Languages />
      <Volunteering />
      <Socials />
      <Footer />
    </div>
  );
}
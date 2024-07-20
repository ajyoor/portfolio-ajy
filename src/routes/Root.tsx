import { Routes, Route, useLocation } from "react-router-dom";
import HomeContent from "@/pages/home";
import AboutContent from "@/pages/about";
import ExperienceContent from "@/pages/experience";
import ProjectsContent from "@/pages/projects";
import SkillsContent from "@/pages/skills";

const Root = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomeContent />} />
      <Route path="/about" element={<AboutContent />} />
      <Route path="/experience" element={<ExperienceContent />} />
      <Route path="/projects" element={<ProjectsContent />} />
      <Route path="/skills" element={<SkillsContent />} />
    </Routes>
  );
};

export default Root;

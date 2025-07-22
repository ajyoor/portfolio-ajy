import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomeContent from "@/pages/home";
import AboutContent from "@/pages/about";
// import ProjectsContent from "@/pages/projects";
import TalkContent from "@/pages/talk";
import BlogContent from "@/pages/blog";
import { useContext } from "react";
import { DarkMode } from "@/context/DarkMode";
import BlogDetailContent from "@/pages/detail";
import ListBlogContent from "@/pages/admin/pages/list";
import BlogForm from "@/pages/admin/pages/form";

const Root = () => {
  const location = useLocation();
  const { darkMode } = useContext(DarkMode);
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route path="/admin" element={<ListBlogContent />} />
        <Route path="/admin/create" element={<BlogForm />} />
        <Route path="/admin/edit/:id" element={<BlogForm />} />
      </Routes>
    );
  }

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomeContent dark={darkMode} />} />
      <Route path="/about" element={<AboutContent dark={darkMode} />} />
      {/* <Route path="/box" element={<ProjectsContent dark={darkMode} />} /> */}
      <Route path="/box" element={<TalkContent dark={darkMode} />} />
      <Route path="/blog" element={<BlogContent dark={darkMode} />} />
      <Route
        path="/blog/detail/:id"
        element={<BlogDetailContent dark={darkMode} />}
      />
    </Routes>
  );
};

export default Root;

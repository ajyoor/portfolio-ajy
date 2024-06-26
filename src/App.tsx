import "./App.css";
import Root from "@/routes/Root.js";
import SidebarLink from "@/components/SidebarDirect";
import { useLocation } from "react-router-dom";
import Particles from "@/components/Particle";

function App() {
  const url = useLocation();
  const baseBg = [
    {
      miniURL: "/",
      class: "bg-gradient-to-t from-gray-300 to-gray-500",
    },
    {
      miniURL: "/experience",
      class: "bg-[#0D0D0B] text-white",
    },
    {
      miniURL: "/skills",
      class: "bg-[#0D0D0B] text-white",
    },
  ];
  const classURL = baseBg.find(
    (key) => key.miniURL === url.pathname && key.class
  );

  return (
    <div
      className={`p-0 m-0 mx-auto relative ${classURL?.class} h-screen w-screen sm:w-auto`}
    >
      <SidebarLink />
      <Particles/>
      <Root></Root>
    </div>
  );
}

export default App;

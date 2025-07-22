import { useContext, useEffect } from "react";
import "./App.css";
import Root from "@/routes/Root.js";
import { DarkMode } from "./context/DarkMode";
import {
  BiCube,
  BiHomeAlt,
  BiUserCircle,
  BiBookContent,
  BiSend,
  BiChat,
} from "react-icons/bi";
import { useLocation, Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { PiSunDimFill } from "react-icons/pi";

function App() {
  const { darkMode, setDarkMode } = useContext(DarkMode);
  const url = useLocation();
  const isAdminRoute = url.pathname.startsWith("/admin");

  const data = [
    {
      icon: (
        <BiHomeAlt
          className={`icon-sidebar ${
            !darkMode ? "text-[#8f8f8f]" : "text-white"
          }`}
          size="28px"
        />
      ),
      url: "/home",
    },
    {
      icon: (
        <BiUserCircle
          className={`icon-sidebar ${
            !darkMode ? "text-[#8f8f8f]" : "text-white"
          }`}
          size="28px"
        />
      ),
      url: "/about",
    },
    {
      icon: (
        <BiChat
          className={`icon-sidebar ${
            !darkMode ? "text-[#8f8f8f]" : "text-white"
          }`}
          size="25px"
        />
      ),
      url: "/box",
    },
    {
      icon: (
        <BiBookContent
          className={`icon-sidebar ${
            !darkMode ? "text-[#8f8f8f]" : "text-white"
          }`}
          size="28px"
        />
      ),
      url: "/blog",
    },
  ];

  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, [url.pathname]);

  if (isAdminRoute) {
    return <Root />;
  }

  return (
    <div
      className={`${
        !darkMode ? "bg-[#161616]" : "bg-lightBg"
      } min-h-full px-3 pb-3 relative overflow-x-hidden`}
    >
      <div
        className={`fixed top-0 left-0 w-full h-[84px] z-[998] ${
          !darkMode ? "bg-[#161616]" : "bg-lightBg"
        }`}
      ></div>
      <header
        className={`flex gap-8 z-[999] fixed flex-row top-3 left-1/2 -translate-x-1/2 rounded-xl justify-between shadow-xl p-3 border w-[calc(100%-24px)] max-w-[776px] ${
          !darkMode ? "bg-grayBg border-grayBorder" : "bg-lightBg2 border-white"
        }`}
      >
        <div className="flex items-center gap-10 sm:gap-4 xs:gap-4 relative">
          {data.map((key) => {
            const isActive = url.pathname
              .split("/")
              .join(" ")
              .includes(key.url.split("/").join(" "));
            return (
              <Link
                key={key.url}
                to={key.url}
                className={`icon-sidebarr rounded-full text-[10px] p-1 relative ${
                  isActive
                    ? "text-white"
                    : !darkMode
                    ? "text-white"
                    : "text-white"
                }`}
              >
                {key.icon}
                {isActive && (
                  <div
                    className={`absolute inset-0 -z-10 rounded-full transition-colors duration-300 ${
                      !darkMode ? "bg-[#373737]" : "bg-lightText"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-1">
          <button
            className="border-none bg-transparent hover:shadow-none flex gap-2 items-center text-white py-1 px-5 rounded-md hover:border xsm:p-0"
            onClick={() => setDarkMode(!darkMode)}
          >
            {!darkMode ? <MdDarkMode size={28} /> : <PiSunDimFill size={28} />}
          </button>
          <button
            className={`sm:text-xs sm:px-3 sm:font-bold flex gap-2 items-center text-white py-1 px-5 rounded-md hover:shadow-xl xsm:hidden ${
              !darkMode ? "bg-[#2E2E2E]" : "bg-lightText"
            }`}
            onClick={() => window.open("mailto:oyojwork@gmail.com")}
          >
            <BiSend
              className={`${!darkMode ? "text-[#8f8f8f]" : "text-white"}`}
            />
            Hire me
          </button>
        </div>
      </header>
      <div className="mt-[84px] w-[calc(100%-24px)] max-w-[776px] mx-auto md:w-full md:max-w-full">
        <Root></Root>
      </div>
    </div>
  );
}

export default App;

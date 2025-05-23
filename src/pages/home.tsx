import ImgPerson from "@/assets/sangar.jpeg";
import {
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoInstagramAlt,
  BiLogoGmail,
  // BiLogoTwitter,
  BiSolidFileBlank,
  BiSend,
  BiLogoSpotify,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { SplitText } from "@/components/Text";
import { AnimatedContent } from "@/components/Content";

const sosmedLink = [
  // {
  //   id: 1,
  //   icon: <BiLogoTwitter className="text-white" size={26} />,
  //   link: "https://x.com/ajyoor",
  // },
  {
    id: 2,
    icon: <BiLogoInstagramAlt className="text-white" size={26} />,
    link: "https://www.instagram.com/ajyoor/",
  },
  {
    id: 3,
    icon: <BiLogoSpotify className="text-white" size={26} />,
    link: "https://open.spotify.com/user/airlan99a?si=a0d539b3682f49b1",
  },
  {
    id: 4,
    icon: <BiLogoGithub className="text-white" size={26} />,
    link: "https://github.com/ajyoor",
  },
  {
    id: 5,
    icon: <BiLogoLinkedin className="text-white" size={26} />,
    link: "https://www.linkedin.com/in/airlangga-joyonegoro-97037024a/",
  },
  {
    id: 6,
    icon: <BiLogoGmail className="text-white" size={26} />,
    link: "mailto:oyojwork@gmail.com",
  },
];
const home = ({ dark }: { dark: any }) => {
  const yearCount = new Date().getFullYear();
  const darkMode = dark;

  return (
    <main
      className={`ff-1 flex flex-col h-fit text-start gap-3 w-auto rounded-xl shadow-xl py-5 my-2 border xs:px-1 ${
        !darkMode ? "bg-grayBg border-grayBorder" : "bg-lightBg2 border-white"
      }`}
      // desktop content"
    >
      <section className="flex justify-between items-center px-5">
        <div className="flex gap-4 items-center">
          <div
            className={`rounded-full ${
              !darkMode ? "bg-[#626262]" : "bg-red-400"
            } w-2 h-2`}
          ></div>
          <span
            className={`${
              !darkMode ? "text-grayTextContent" : "text-lightText"
            } text-xl sm:text-lg xs:text-sm font-bold`}
          >
            Software Engineer
          </span>
        </div>
        <div
          className={`rounded-full ${
            !darkMode ? "bg-[#263A2F]" : "bg-lightBg"
          } w-fit h-fit sm:p-2 pl-[17px] p-[6px] flex items-center gap-1`}
        >
          <div className="rounded-full bg-green-500 w-2 h-2 animate-blink"></div>
          <span className="uppercase text-[#049753] text-xs px-2 sm:hidden">
            Available For Work
          </span>
        </div>
      </section>

      {/* main home resp */}
      <section>
        {/* desktop content */}
        <div className="flex justify-center items-center text-start my-12 md:hidden gap-16">
          <div className="flex flex-col gap-2">
            <SplitText
              text="I'm Airlangga"
              className={`text-4xl font-bold my-3 sm:text-2xl !text-start ${
                !darkMode ? "text-white" : "text-lightText"
              }`}
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
            <span
              className={`${
                !darkMode ? "text-grayText" : "text-white"
              } text-md sm:text-sm`}
            >
              Software Engineer from Indonesia.
            </span>
            <span
              className={`${
                !darkMode ? "text-grayText" : "text-white"
              } text-md sm:text-sm`}
            >
              Always learning, always building.
            </span>
            <div className="flex gap-3 mt-6">
              <button
                className={` ${
                  !darkMode
                    ? "bg-[#2E2E2E] border-none  hover:shadow-xl hover:border"
                    : "!border"
                } xs:text-sm flex gap-2 items-center  text-white py-1 px-5 rounded-md`}
                onClick={() => window.open("mailto:oyojwork@gmail.com")}
              >
                <BiSend
                  className={`${!darkMode ? "text-[#8f8f8f]" : "text-white"}`}
                />
                Hire me
              </button>
              <button
                className={`${
                  !darkMode
                    ? "border-grayBorder hover:shadow-xl hover:border"
                    : "border-white"
                } border xs:text-sm flex gap-2 items-center  text-white py-1 px-5 rounded-md`}
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1Zzl5JJBTmtMHhEteBrJMqJdBgLer9ZUQ/view?usp=drive_link"
                  )
                }
              >
                <BiSolidFileBlank
                  className={`${!darkMode ? "text-[#8f8f8f]" : "text-white"}`}
                />
                My CV
              </button>
            </div>
          </div>
          <div
            className={`border  w-[160px] h-[160px] overflow-hidden rounded-full p-3 ${
              !darkMode
                ? "bg-[#2C2C2C] border-grayBorder"
                : "bg-lightBgborder-white"
            }`}
          >
            <img
              src={ImgPerson}
              alt="img"
              defaultValue={ImgPerson}
              className="scale-[1.5] mt-[18px]"
              srcSet={ImgPerson}
              loading="lazy"
            />
          </div>
        </div>

        {/* resp content*/}
        <div className="hidden md:flex flex-col gap-2 justify-center items-center text-center my-12">
          <div
            className={`border w-[160px] h-[160px] overflow-hidden rounded-full p-3 ${
              !darkMode
                ? "bg-[#2C2C2C] border-grayBorder"
                : "bg-lightBg border-white"
            }`}
          >
            <img
              src={ImgPerson}
              alt="img"
              defaultValue={ImgPerson}
              className="scale-[1.5] mt-[18px]"
              srcSet={ImgPerson}
              loading="lazy"
            />
          </div>
          <SplitText
            text="I'm Airlangga"
            className={`text-4xl font-bold my-3 sm:text-2xl ${
              !darkMode ? "text-white" : "text-lightText"
            }`}
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >
            <div className="flex flex-col gap-2">
              <span
                className={`${
                  !darkMode ? "text-grayText" : "text-white"
                } text-md sm:text-sm`}
              >
                Software Engineer from Indonesia.
              </span>
              <span
                className={`${
                  !darkMode ? "text-grayText" : "text-white"
                } text-md sm:text-sm`}
              >
                Always learning, always building.
              </span>
            </div>
          </AnimatedContent>
          <div className="flex gap-3 mt-6">
            <button
              className={` ${
                !darkMode
                  ? "bg-[#2E2E2E] border-none  hover:shadow-xl hover:border"
                  : "!border"
              } xs:text-sm flex gap-2 items-center  text-white py-1 px-5 rounded-md`}
              onClick={() => window.open("mailto:oyojwork@gmail.com")}
            >
              <BiSend
                className={`${!darkMode ? "text-[#8f8f8f]" : "text-white"}`}
              />
              Hire me
            </button>
            <button
              className={`${
                !darkMode ? "border-grayBorder hover:shadow-xl" : "border-white"
              } border xs:text-sm flex gap-2 items-center text-white py-1 px-5 rounded-md`}
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1Zzl5JJBTmtMHhEteBrJMqJdBgLer9ZUQ/view?usp=drive_link"
                )
              }
            >
              <BiSolidFileBlank
                className={`${!darkMode ? "text-[#8f8f8f]" : "text-white"}`}
              />
              My CV
            </button>
          </div>
        </div>
      </section>

      {/* follow me */}
      <section
        className={`${
          // desktop content
          !darkMode
            ? "bg-grayBorder border-grayBorder"
            : "bg-lightBg2 border-white"
        } flex justify-between rounded-xl shadow-xl border p-5 sm:flex-col sm:gap-4 mx-3`}
      >
        <div className="flex gap-4 items-center">
          <div
            className={`rounded-full ${
              !darkMode ? "bg-[#626262]" : "bg-red-400"
            } w-2 h-2`}
          ></div>
          <span
            className={`${
              !darkMode ? "text-grayTextContent" : "text-lightText"
            } text-xl sm:text-base font-bold`}
          >
            Follow Me
          </span>
        </div>
        <div className="flex flex-wrap gap-3 items-center sm:justify-evenly sm:items-center sm:gap-2 xs:gap-4">
          {sosmedLink.map((key) => {
            return (
              <Link
                key={key.link}
                className={`border ${
                  !darkMode
                    ? "bg-[#2C2C2C] border border-gray-500 hover:bg-grayBg"
                    : "bg-lightBg2 shadow-2xl border-white hover:bg-lightText"
                } text-white rounded-full p-2`}
                to={key.link}
              >
                {key.icon}
              </Link>
            );
          })}
        </div>
      </section>

      {/* last updated */}
      <section
        className={`${
          // desktop content
          !darkMode
            ? "bg-grayBorder border-grayBorder"
            : "bg-lightBg2 border-white"
        } flex justify-center rounded-xl shadow-xl border p-5 mx-3`}
      >
        <span
          className={` ${
            !darkMode ? "text-grayTextContent" : "text-white"
          } text-xs font-thin`}
        >
          @{yearCount} Last Updated
        </span>
      </section>
    </main>
  );
};

export default home;

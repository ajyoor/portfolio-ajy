import { Link } from "react-router-dom";
import htmlIcon from "@/assets/html.png";
import cssIcon from "@/assets/css.png";
import sassIcon from "@/assets/sass.png";
import jsIcon from "@/assets/js.png";
import tsIcon from "@/assets/ts.png";
import ciIcon from "@/assets/codeigniter.svg";
import laravelIcon from "@/assets/laravel.png";
import jqueryIcon from "@/assets/jquery.svg";
import reactIcon from "@/assets/react.png";
import nextIcon from "@/assets/nextjs.svg";
import reduxIcon from "@/assets/redux.svg";
import tailwindIcon from "@/assets/tailwind.png";
import bstIcon from "@/assets/bootstrap.svg";
import gitIcon from "@/assets/git.png";
import bunIcon from "@/assets/bun.png";
import figmaIcon from "@/assets/figma.png";
import { BiSolidFileBlank, BiSend } from "react-icons/bi";
import Button from "@/components/Button";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
} from "react-icons/tb";
import {
  FaHtml5,
  FaCss3Alt,
  FaLaravel,
  FaReact,
  FaBootstrap,
  FaGitSquare,
  FaFigma,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiTypescript,
  SiCodeigniter,
  SiJquery,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
} from "react-icons/si";

const about = () => {
  const stack = [
    {
      icon: <FaHtml5 size={50} />,
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      icon: <FaCss3Alt size={50} />,
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      icon: <IoLogoJavascript size={50} />,
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      icon: <SiTypescript size={50} />,
      link: "https://www.typescriptlang.org/",
    },
    {
      icon: <SiCodeigniter size={50} />,
      link: "https://www.codeigniter.com/",
    },
    {
      icon: <FaLaravel size={50} />,
      link: "https://laravel.com/",
    },
    {
      icon: <SiJquery size={50} />,
      link: "https://jquery.com/",
    },
    {
      icon: <FaReact size={50} />,
      link: "https://react.dev/",
    },
    {
      icon: <SiNextdotjs size={50} />,
      link: "https://nextjs.org/",
    },
    {
      icon: <SiRedux size={50} />,
      link: "https://redux.js.org/",
    },
    {
      icon: <SiTailwindcss size={50} />,
      link: "https://tailwindcss.com/",
    },
    {
      icon: <FaBootstrap size={50} />,
      link: "https://getbootstrap.com/",
    },
    {
      icon: <FaGitSquare size={50} />,
      link: "https://www.git-scm.com/",
    },
    {
      icon: <FaFigma size={50} />,
      link: "https://www.figma.com/",
    },
  ];
  const office = [
    {
      name: "PT. AZLogistik Dot Com",
      year: "2022 - Now",
      role: "Front End Web Developer",
      icon: <TbCircleNumber1Filled className="xs:hidden" size={20} />,
      status: "Fulltime",
    },
    {
      name: "PT. AZLogistik Dot Com",
      year: "2022 - Now",
      role: "Front End Web Developer",
      icon: <TbCircleNumber2Filled className="xs:hidden" size={20} />,
      status: "Fulltime",
    },
    {
      name: "PT. AZLogistik Dot Com",
      year: "2022 - Now",
      role: "Front End Web Developer",
      icon: <TbCircleNumber3Filled className="xs:hidden" size={20} />,
      status: "Fulltime",
    },
    {
      name: "PT. AZLogistik Dot Com",
      year: "2022 - Now",
      role: "Front End Web Developer",
      icon: <TbCircleNumber4Filled className="xs:hidden" size={20} />,
      status: "Fulltime",
    },
    {
      name: "PT. AZLogistik Dot Com",
      year: "2022 - Now",
      role: "Front End Web Developer",
      icon: <TbCircleNumber5Filled className="xs:hidden" size={20} />,
      status: "Fulltime",
    },
  ];

  return (
    <main className="ff-1 flex flex-col h-fit text-start gap-3 px-3 w-auto md:bg-grayBg md:rounded-xl md:shadow-xl md:py-5 md:my-2 md:border md:border-grayBorder xs:px-1">
      <section className="items-center px-5">
        <div className="flex gap-4 items-center">
          <div className="rounded-full bg-[#626262] w-2 h-2"></div>
          <span className="text-grayTextContent text-xl sm:text-lg xs:text-sm font-bold">
            More About Me
          </span>
        </div>
        <span className="text-grayText text-justify text-base sm:text-sm leading-8">
          A Front End Web Developer with experience and expertise in creating
          attractive and responsive user interfaces. Do you need a website that
          is not only functional but also visually stunning? I am ready to help
          you achieve those goals. I invite you to explore the diverse range of
          projects I have undertaken, highlighting my skills, creativity, and
          attention to detail.
        </span>
      </section>
      <section className="hidden md:flex justify-between bg-grayBorder rounded-xl shadow-xl border border-grayBorder p-5 flex-col gap-5 sm:gap-4">
        <div className="flex gap-4 items-center">
          <div className="rounded-full bg-[#626262] w-2 h-2"></div>
          <span className="text-grayTextContent text-xl sm:text-lg xs:text-sm font-bold">
            Journey Experience
          </span>
        </div>
        {office.map((key) => {
          return (
            <div className="hidden md:flex justify-between bg-[#373737] rounded-xl shadow-xl border border-grayBorder p-5 flex-col gap-5 xs:gap-4 ">
              <div className="flex justify-between text-white xs:flex-col">
                <div className="flex gap-2 items-center">
                  {key.icon}
                  <span className="font-bold text-base sm:text-sm">{key.name}</span>
                </div>
                <span className="font-normal text-base sm:text-sm">{key.year}</span>
              </div>
              <div className="flex gap-3 xs:flex-col">
                <span className="text-grayText text-sm font-semibold bg-[#424242] rounded-xl py-1 px-3 w-fit">
                  {key.role}
                </span>
                <span className="text-grayText text-sm font-semibold bg-[#424242] rounded-xl py-1 px-3 w-fit">
                  {key.status}
                </span>
              </div>
            </div>
          );
        })}
      </section>
      <section className="hidden md:flex justify-between bg-grayBorder rounded-xl shadow-xl border border-grayBorder p-5 flex-col gap-5 sm:gap-4">
        {/* <div className="flex gap-4 items-center">
          <div className="rounded-full bg-[#626262] w-2 h-2"></div>
          <span className="text-grayTextContent text-xl xs:text-sm font-bold">
            Skills
          </span>
        </div> */}
        <div className="w-full flex flex-wrap gap-5 items-center justify-center">
          {stack.map((key) => {
            return (
              <Link
                to={key.link}
                className="rounded-full p-3 bg-[#2C2C2C] border border-gray-700 shadow-2xl w-fit h-fit ease-in-out text-white"
              >
                {key.icon}
              </Link>
            );
          })}
        </div>
      </section>
      <section className="hidden md:flex justify-center items-center lg:bg-grayBorder lg:rounded-xl lg:shadow-xl lg:border lg:border-grayBorder p-5 flex-col gap-5 sm:gap-4">
        <span className="text-white text-3xl font-bold">
          Let's Work Together.
        </span>
        <span className="text-grayText ext-base sm:text-sm">
          Creating your own or business website with me.
        </span>
        <div className="flex gap-3 mt-2">
          <Button
            className="border-none xs:text-sm"
            icon={<BiSend className="text-[#8F8F8F]" />}
            onClick={() => console.log("hire me click")}
          >
            Hire me
          </Button>
          <Button
            className="bg-transparent border border-grayBorder xs:text-sm"
            icon={<BiSolidFileBlank className="text-[#8F8F8F]" />}
            onClick={() => console.log("cv click")}
          >
            My CV
          </Button>
        </div>
      </section>
    </main>
  );
};

export default about;

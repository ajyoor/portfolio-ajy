import { ReactNode } from "react";
import {
  TbCircleFilled,
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
  TbCircleNumber6Filled,
} from "react-icons/tb";
import {
  FaHtml5,
  FaCss3Alt,
  FaLaravel,
  FaReact,
  FaGitSquare,
  FaFigma,
  FaImdb,
  FaSpotify,
  FaQuran,
} from "react-icons/fa";
import {
  SiTypescript,
  SiCodeigniter,
  SiFlutter,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiNestjs,
} from "react-icons/si";
import { FaThreads } from "react-icons/fa6";
import {
  IoGameController,
  IoNewspaperOutline,
  IoLogoJavascript,
} from "react-icons/io5";
import { TbJson } from "react-icons/tb";
import {
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoInstagramAlt,
  BiLogoGmail,
  // BiLogoTwitter,
  BiLogoSpotify,
} from "react-icons/bi";
import Game from "@/assets/game.png";
import Twitter from "@/assets/twitter.png";
import Quran from "@/assets/quarn.png";
import News from "@/assets/news.png";
import { CardImageContainer } from "@/components/Card";

interface ISosialMedia {
  id: number;
  icon: ReactNode;
  link: string;
}

interface IStack {
  icon: ReactNode;
  link: string;
}

interface IOffice {
  name: string;
  year: string;
  role: string;
  icon: ReactNode;
  status: string;
}

interface IProjects {
  icon: ReactNode;
  title: string;
  description: ReactNode[];
  link: string;
}

interface IProjectsCatalog {
  content: ReactNode;
}

export const SosialMedia: ISosialMedia[] = [
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

export const AboutMe = ({ dark }: { dark: boolean }) => {
  return (
    <span
      className={`${
        !dark ? "text-grayText" : "text-white"
      } text-justify text-base sm:text-sm leading-8 sm:!leading-7 pt-2 block`}
    >
      I'm a Software Engineer with a strong foundation in Front-End Web
      Development, now expanding into full-stack development. My journey began
      with crafting responsive, user-centric interfaces — and now I'm building
      on that by exploring backend technologies, scalable architectures, and
      collaborative development practices.
      <br />
      I'm passionate about writing clean, maintainable code and continuously
      learning to become a well-rounded engineer. Whether it's creating
      intuitive UI or solving deeper technical challenges, I'm driven by
      curiosity, growth, and building impactful digital experiences.
    </span>
  );
};

export const ProjectDescription: string =
  "Here are some of my works that I can show in general (because I am also bound by work that I certainly cannot publish), mostly include recreate some famous websites that you can see and clone through my GitHub site.";

export const Stack: IStack[] = [
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
    icon: <SiTypescript size={45} />,
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
    icon: <SiTailwindcss size={50} />,
    link: "https://tailwindcss.com/",
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
    icon: <SiFlutter size={40} />,
    link: "https://flutter.dev/",
  },
  {
    icon: <SiNestjs size={50} />,
    link: "https://nestjs.com/",
  },
  {
    icon: <FaGitSquare size={50} />,
    link: "https://www.git-scm.com/",
  },
  {
    icon: <FaFigma size={45} />,
    link: "https://www.figma.com/",
  },
];

export const Office: IOffice[] = [
  {
    name: "Komunal Indonesia",
    year: "2025 - Now",
    role: "Software Engineer",
    icon: <TbCircleNumber1Filled className="xs:hidden" size={20} />,
    status: "Fulltime",
  },
  {
    name: "muatmuat",
    year: "2022 - 2025",
    role: "Front End Web Developer",
    icon: <TbCircleNumber2Filled className="xs:hidden" size={20} />,
    status: "Fulltime",
  },
  {
    name: "CV. Nusantara Jagung Malang",
    year: "2022",
    role: "Front End Web Developer",
    icon: <TbCircleNumber3Filled className="xs:hidden" size={20} />,
    status: "Lecturer Project",
  },
  {
    name: "Brawijaya University (Faculty Economy and Business)",
    year: "2022",
    role: "Front End Web Developer",
    icon: <TbCircleNumber4Filled className="xs:hidden" size={20} />,
    status: "Freelance",
  },
  {
    name: "Perum Bulog Malang",
    year: "2022",
    role: "Fullstack Web Developer",
    icon: <TbCircleNumber5Filled className="xs:hidden" size={20} />,
    status: "Internship",
  },
  {
    name: "PT. Geomedia Sinergi Malang",
    year: "2019",
    role: "Backend Developer",
    icon: <TbCircleNumber6Filled className="xs:hidden" size={20} />,
    status: "Internship",
  },
];

export const Projects: IProjects[] = [
  {
    icon: <FaQuran size={32} color="#c0c0c0" />,
    title: "Quran PRO Cloned",
    description: [
      <SiTypescript size={20} color="#c0c0c0" />,
      <SiNextdotjs size={20} color="#c0c0c0" />,
      <SiTailwindcss size={20} color="#c0c0c0" />,
      <SiRedux size={20} color="#c0c0c0" />,
      <TbJson size={20} color="#c0c0c0" />,
    ],
    link: "#",
  },
  {
    icon: <FaThreads size={32} color="#c0c0c0" />,
    title: "Threads Cloned",
    description: [
      <SiTypescript size={20} color="#c0c0c0" />,
      <SiNextdotjs size={20} color="#c0c0c0" />,
      <SiTailwindcss size={20} color="#c0c0c0" />,
      <SiRedux size={20} color="#c0c0c0" />,
    ],
    link: "#",
  },
  {
    icon: <FaSpotify size={32} color="#c0c0c0" />,
    title: "Spotify Cloned",
    description: [
      <IoLogoJavascript size={20} color="#c0c0c0" />,
      <SiNextdotjs size={20} color="#c0c0c0" />,
      <SiTailwindcss size={20} color="#c0c0c0" />,
      <SiRedux size={20} color="#c0c0c0" />,
      <TbJson size={20} color="#c0c0c0" />,
    ],
    link: "#",
  },
  {
    icon: <FaImdb size={32} color="#c0c0c0" />,
    title: "IMDB Cloned",
    description: [
      <IoLogoJavascript size={20} color="#c0c0c0" />,
      <SiNextdotjs size={20} color="#c0c0c0" />,
      <SiTailwindcss size={20} color="#c0c0c0" />,
      <SiRedux size={20} color="#c0c0c0" />,
      <TbJson size={20} color="#c0c0c0" />,
    ],
    link: "#",
  },
  {
    icon: <IoGameController size={32} color="#c0c0c0" />,
    title: "Game Voucher",
    description: [
      <IoLogoJavascript size={20} color="#c0c0c0" />,
      <SiNextdotjs size={20} color="#c0c0c0" />,
      <SiTailwindcss size={20} color="#c0c0c0" />,
      <SiRedux size={20} color="#c0c0c0" />,
    ],
    link: "#",
  },
  {
    icon: <IoNewspaperOutline size={32} color="#c0c0c0" />,
    title: "News Portal",
    description: [
      <IoLogoJavascript size={20} color="#c0c0c0" />,
      <FaReact size={20} color="#c0c0c0" />,
      <SiTailwindcss size={20} color="#c0c0c0" />,
      <TbJson size={20} color="#c0c0c0" />,
    ],
    link: "#",
  },
];
export const ProjectsCatalog = ({
  dark,
}: {
  dark: boolean;
}): IProjectsCatalog[] => {
  return [
    { content: <CardImageContainer src={Game} alt="Game" dark={dark} /> },
    {
      content: <CardImageContainer src={Twitter} alt="Twitter" dark={dark} />,
    },
    { content: <CardImageContainer src={News} alt="News" dark={dark} /> },
    { content: <CardImageContainer src={Quran} alt="Quran" dark={dark} /> },
  ];
};

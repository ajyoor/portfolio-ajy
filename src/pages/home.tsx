import ImgPerson from "@/assets/kren.jpeg";
import { Link } from "react-router-dom";
import { SplitText } from "@/components/Text";
import { AnimatedContent, DotCircleContent } from "@/components/Content";
import { SosialMedia } from "@/constants/content";
import Card, { CardSecondary } from "@/components/Card";
import { BiSend, BiSolidFileBlank } from "react-icons/bi";

const home = ({ dark }: { dark: any }) => {
  const yearCount = new Date().getFullYear();

  return (
    <Card dark={dark}>
      <section className="flex justify-between items-center">
        <DotCircleContent dark={dark} title="Software Engineer" />
        <div
          className={`rounded-full ${
            !dark ? "bg-[#263A2F]" : "bg-lightBg"
          } w-fit h-fit sm:p-2 pl-[17px] p-[6px] flex items-center gap-1`}
        >
          <div className="rounded-full bg-green-500 w-2 h-2 animate-blink"></div>
          <span className="uppercase text-[#049753] text-xs px-2 sm:hidden">
            Available For Work
          </span>
        </div>
      </section>

      {/* main home resp */}
      <ContentResp dark={dark} />

      {/* follow me */}
      <CardSecondary className="!flex-row sm:!flex-col" dark={dark}>
        <DotCircleContent dark={dark} title="Follow Me" />
        <div className="flex flex-wrap gap-6 items-center sm:justify-evenly sm:items-center sm:gap-2 xs:gap-4">
          {SosialMedia.map((key) => {
            return (
              <Link
                key={key.link}
                className={`border ${
                  !dark
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
      </CardSecondary>

      {/* last updated */}
      <CardSecondary className="place-items-center" dark={dark}>
        <span
          className={` ${
            !dark ? "text-grayTextContent" : "text-white"
          } text-xs font-thin`}
        >
          @{yearCount} Last Updated
        </span>
      </CardSecondary>
    </Card>
  );
};

export default home;

const ContentResp = ({ dark }: { dark: any }) => {
  return (
    <section>
      {/* desktop content */}
      <div className="flex justify-center items-center text-start my-12 md:hidden gap-16">
        <div className="flex flex-col gap-2">
          <SplitTextContent dark={dark} />
          <DescriptionContent dark={dark} />
        </div>
        <div
          className={`border  w-[160px] h-[160px] overflow-hidden rounded-full p-3 ${
            !dark ? "bg-[#2C2C2C] border-grayBorder" : "bg-lightBgborder-white"
          }`}
        >
          <img
            src={ImgPerson}
            alt="img"
            defaultValue={ImgPerson}
            className="scale-[3.5] -mt-28 !rotate-6 ml-3"
            srcSet={ImgPerson}
            loading="lazy"
          />
        </div>
      </div>

      {/* resp content*/}
      <div className="hidden md:flex flex-col gap-2 justify-center items-center text-center my-12">
        <div
          className={`border w-[160px] h-[160px] overflow-hidden rounded-full p-3 ${
            !dark ? "bg-[#2C2C2C] border-grayBorder" : "bg-lightBg border-white"
          }`}
        >
          <img
            src={ImgPerson}
            alt="img"
            defaultValue={ImgPerson}
            className="scale-[3.5] -mt-28 !rotate-6 ml-3"
            srcSet={ImgPerson}
            loading="lazy"
          />
        </div>
        <SplitTextContent dark={dark} />
        <DescriptionContent dark={dark} />
      </div>
    </section>
  );
};

const ButtonSection = ({ dark }: { dark: boolean }) => {
  return (
    <div className="flex gap-3 mt-6">
      <button
        className={` ${
          !dark
            ? "bg-[#2E2E2E] border-none  hover:shadow-xl hover:border"
            : "!border"
        } xs:text-sm flex gap-2 items-center  text-white py-1 px-5 rounded-md`}
        onClick={() => window.open("mailto:oyojwork@gmail.com")}
      >
        <BiSend className={`${!dark ? "text-[#8f8f8f]" : "text-white"}`} />
        Hire me
      </button>
      <button
        className={`${
          !dark ? "border-grayBorder hover:shadow-xl" : "border-white"
        } border xs:text-sm flex gap-2 items-center text-white py-1 px-5 rounded-md`}
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1Zzl5JJBTmtMHhEteBrJMqJdBgLer9ZUQ/view?usp=drive_link"
          )
        }
      >
        <BiSolidFileBlank
          className={`${!dark ? "text-[#8f8f8f]" : "text-white"}`}
        />
        My CV
      </button>
    </div>
  );
};

const SplitTextContent = ({ dark }: { dark: boolean }) => {
  return (
    <SplitText
      text="I'm Airlangga"
      className={`text-4xl font-bold my-3 sm:text-2xl !text-start sm:!text-center ${
        !dark ? "text-white" : "text-lightText"
      }`}
      delay={150}
      animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
      animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
      easing="easeOutCubic"
      threshold={0.2}
      rootMargin="-50px"
    />
  );
};

const DescriptionContent = ({ dark }: { dark: boolean }) => {
  return (
    <AnimatedContent>
      <div className="flex flex-col gap-2">
        <span
          className={`${
            !dark ? "text-grayText" : "text-white"
          } text-md sm:text-sm`}
        >
          Software Engineer from Indonesia.
        </span>
        <span
          className={`${
            !dark ? "text-grayText" : "text-white"
          } text-md sm:text-sm`}
        >
          Always learning, always building.
        </span>
      </div>
      <ButtonSection dark={dark} />
    </AnimatedContent>
  );
};

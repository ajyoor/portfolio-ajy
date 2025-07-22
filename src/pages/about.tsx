import { Link } from "react-router-dom";
import { AnimatedContent, DotCircleContent } from "@/components/Content";
import Card, { CardSecondary, CardTertiary } from "@/components/Card";
import { AboutMe, Office, Stack } from "@/constants/content";
import { Ads } from "./ads";

const about = ({ dark }: { dark: boolean }) => {
  return (
    <Card dark={dark}>
      <section className="items-center">
        <DotCircleContent dark={dark} title="More About Me" />
        <AboutMe dark={dark} />
      </section>
      <CardSecondary dark={dark}>
        <DotCircleContent dark={dark} title="Journey Experience" />
        {Office.map((key) => {
          return (
            <AnimatedContent key={key.name}>
              <CardTertiary dark={dark}>
                <div className="flex justify-between items-center text-white xs:flex-col gap-3">
                  <div className="flex gap-2 items-center">
                    <div
                      className={`w-5 h-5 ${
                        !dark ? "text-white" : "text-lightText"
                      }`}
                    >
                      {key.icon}
                    </div>
                    <span
                      className={`${
                        !dark ? "text-white" : "text-lightText"
                      } font-bold text-base sm:text-sm`}
                    >
                      {key.name}
                    </span>
                  </div>
                  <span className="font-normal text-base sm:text-sm">
                    {key.year}
                  </span>
                </div>
                <div className="flex gap-3 xs:flex-col">
                  <span
                    className={`text-grayText text-sm font-semibold ${
                      !dark ? "bg-[#424242]" : "bg-gray-100"
                    } rounded-xl py-1 px-3 w-fit xsm:text-xs xsm:font-bold`}
                  >
                    {key.role}
                  </span>
                  <span
                    className={`text-grayText text-sm font-semibold ${
                      !dark ? "bg-[#424242]" : "bg-gray-100"
                    } rounded-xl py-1 px-3 w-fit flex items-center xsm:text-xs xsm:font-bold`}
                  >
                    {key.status}
                  </span>
                </div>
              </CardTertiary>
            </AnimatedContent>
          );
        })}
      </CardSecondary>
      <CardSecondary dark={dark} className="!p-0">
        <div className="w-full grid grid-cols-7 place-items-center sm:flex flex-wrap gap-5 !gap-y-0 items-center justify-center px-3 sm:px-0s">
          {Stack.map((key) => {
            return (
              <AnimatedContent key={key.link}>
                <Link to={key.link} className="p-3 w-fit h-fit text-white">
                  {key.icon}
                </Link>
              </AnimatedContent>
            );
          })}
        </div>
      </CardSecondary>
      <Ads dark={dark} />
    </Card>
  );
};

export default about;

import {
  AnimatedContent,
  DotCircleContent,
  SpotlightCard,
} from "@/components/Content";
import Card, { CardSecondary } from "@/components/Card";
import { Ads } from "./ads";
import {
  ProjectDescription,
  Projects,
  ProjectsCatalog,
} from "@/constants/content";

const projects = ({ dark }: { dark: any }) => {
  const projectsCatalog = ProjectsCatalog({ dark: dark });

  return (
    <Card dark={dark}>
      {/* description content */}
      <section className="items-center">
        <DotCircleContent dark={dark} title="Showcase" />
        <span
          className={`${
            !dark ? "text-grayText" : "text-white"
          } text-justify text-base sm:text-sm leading-8 sm:!leading-6 pt-2 block`}
        >
          {ProjectDescription}
        </span>
      </section>
      {/* showcase content */}
      <CardSecondary dark={dark}>
        <div
          className={`h-[250px] sm:h-[180px] relative overflow-hidden border rounded-xl ${
            !dark ? "border-grayBorder" : "border-lightBorder bg-lightBg"
          }`}
        >
          <div className="absolute w-full animate-scroll group-hover:[animation-play-state:paused]">
            {[...projectsCatalog, ...projectsCatalog].map((item, index) => (
              <div
                key={index + "projectsCatalog"}
                className="w-full h-[250px] sm:h-[180px]"
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
        <AnimatedContent>
          <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
            {Projects.map((key, idx) => {
              return (
                <SpotlightCard key={idx + "key.title"} dark={dark}>
                  <div className="flex items-center gap-4">
                    {key.icon}
                    <span
                      className={`${
                        !dark ? "text-grayTextContent" : "text-lightText"
                      } text-xl sm:text-lg xs:text-sm font-semibold`}
                    >
                      {key.title}
                    </span>
                  </div>
                  <p
                    className={`${
                      !dark ? "text-grayText" : "text-lightBorder"
                    } italic text-justify text-sm leading-8 sm:!leading-6 pt-2 block`}
                  >
                    made with :{" "}
                    <div className="flex gap-3 sm:pt-1">
                      {key.description.map((ky) => ky)}
                    </div>
                  </p>
                </SpotlightCard>
              );
            })}
          </div>
        </AnimatedContent>
      </CardSecondary>
      {/* iklan content */}
      <Ads dark={dark} />
    </Card>
  );
};

export default projects;

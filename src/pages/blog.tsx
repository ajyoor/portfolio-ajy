import { useEffect, useState, useMemo, useRef } from "react";
import Input from "@/components/Input";
import Card, { CardBlogs } from "@/components/Card";
import { AnimatedContent, DotCircleContent } from "@/components/Content";
import { motion } from "framer-motion";
import { FileX2, Search, X } from "lucide-react";
import { CiClock2 } from "react-icons/ci";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export interface BlogInterface {
  id: string;
  title: string;
  content: string;
  photo: string;
  status: string;
  updatedAt: string;
}

const BlogContent = ({ dark }: { dark: boolean }) => {
  const [blog, setBlog] = useState<BlogInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLongLoading, setIsLongLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredBlog = useMemo(() => {
    if (!searchTerm) {
      return blog;
    }
    return blog.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [blog, searchTerm]);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      setIsLongLoading(false);

      timerRef.current = setTimeout(() => {
        setIsLongLoading(true);
      }, 5000);

      try {
        const res = await axios.get(`${process.env.API_DEV}blogs`);

        setBlog(
          res.data.filter(
            (x: BlogInterface) => x.status?.toLowerCase() === "published"
          )
        );
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      }
    };

    fetchBlog();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center gap-6">
      {isLongLoading ? (
        <motion.div
          key="initial-loading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, position: "absolute" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 cursor-pointer"
        >
          <DotLottieReact
            src="https://lottie.host/02545bb9-3125-4004-b193-4f846739db3d/o2B2a6l04K.lottie"
            loop
            autoplay
            style={{ height: "200px", width: "200px" }}
          />
          <span
            className={`text-sm font-semibold animate-pulse ${
              dark ? "text-white" : "text-grayTextContent"
            } `}
          >
            Blogs will be loaded in a few seconds
          </span>
        </motion.div>
      ) : (
        <motion.div
          key="long-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-1 w-full"
        >
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div
                key={i + "skeleton"}
                className={`h-32 w-full ${
                  !dark
                    ? "bg-[#373737] border-grayBorder"
                    : "bg-lightBg border-lightBorder"
                } rounded-xl shadow-xl border animate-pulse opacity-30`}
              ></div>
            ))}
        </motion.div>
      )}
    </div>
  );

  let blogContent;
  if (isLoading) {
    blogContent = renderLoadingState();
  } else if (filteredBlog.length > 0) {
    blogContent = (
      <AnimatedContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          {filteredBlog.map((key, idx) => (
            <CardBlogs
              dark={dark}
              key={"blog-" + idx}
              url={`/blog/detail/${key.id}`}
              className="!gap-3"
            >
              <div
                className="absolute right-0 top-0 w-1/2 h-full opacity-20 transform transition-all duration-300 group-hover:opacity-30 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${key.photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center right",
                  maskImage: "linear-gradient(to left, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to left, black, transparent)",
                }}
              ></div>
              <span
                className={`text-xl font-bold relative z-10 ${
                  dark && "!text-lightText"
                }`}
              >
                {key.title}
              </span>
              <div
                className={`flex gap-2 items-center font-semibold text-xs capitalize mb-2 text-grayText`}
              >
                <CiClock2 size={16} strokeWidth={1} />
                {new Date(key?.updatedAt || "").toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
              <span className="container-blog-content text-sm font-medium relative z-10 mt-1 text-justify line-clamp-4 text-grayText">
                <div dangerouslySetInnerHTML={{ __html: key.content }} />
              </span>
            </CardBlogs>
          ))}
        </div>
      </AnimatedContent>
    );
  } else {
    blogContent = (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col items-center justify-center gap-6 py-12 ${
          dark ? "text-white" : "text-grayTextContent"
        }`}
      >
        <FileX2
          size={80}
          className="opacity-50"
          color={dark ? "#e98074" : "#8f8f8f"}
        />
        <span className="text-lg font-semibold">Blog not found</span>
      </motion.div>
    );
  }

  return (
    <Card dark={dark} className="!gap-4">
      <DotCircleContent dark={dark} title="Blogs" />
      {!isLoading && (
        <Input
          dark={dark}
          placeholder="Search Blogs"
          icon={{
            iconLeft: (
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-grayText"
                size={18}
              />
            ),
            iconRight: searchTerm.length > 0 && (
              <X
                onClick={() => setSearchTerm("")}
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-grayText"
              />
            ),
          }}
          onChange={setSearchTerm}
          value={searchTerm}
        />
      )}
      {blogContent}
    </Card>
  );
};

export default BlogContent;

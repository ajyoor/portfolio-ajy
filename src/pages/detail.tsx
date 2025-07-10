import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";
import { FaXTwitter, FaWhatsapp, FaLink } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Card from "@/components/Card";
import { BlogInterface } from "./blog";
import "@/App.css";
import CommentSection from "./comments/big-comments";
import { DotCircleContent } from "@/components/Content";

export interface CommentInterface {
  id: string;
  parentId: string;
  name: string;
  content: string;
  createdAt: string;
  replies: CommentInterface[];
  isLoved: boolean;
}

const BlogDetailContent = ({ dark }: { dark: boolean }) => {
  const [blogDetail, setBlogDetail] = useState<BlogInterface>();
  const [listComments, setListComments] = useState<CommentInterface[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [triggerList, setTriggerList] = useState(false);
  const url = useParams();
  const blogTitle = blogDetail?.title || "";
  const currentUrl = window.location.href;
  const generateText = `Kayaknya cuma aku doang yang suka pusing mikirin ${blogTitle}. Biar nggak pusing sendiri, aku jadiin tulisan aja. Ada yang senasib? 😭 #curhat #relateable`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    currentUrl
  )}&text=${encodeURIComponent(generateText)}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${generateText} ${currentUrl}`
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  useEffect(() => {
    const fetchBlogDetail = async () => {
      const listDetail = await axios.get(
        process.env.API_DEV + "blogs/detail/" + url.id
      );
      const listComments = await axios.get(
        process.env.API_DEV + "blogs/" + url.id + "/comments"
      );

      setBlogDetail(listDetail.data);
      setListComments(listComments.data);
    };

    fetchBlogDetail();
    setTriggerList(false);
  }, [url.id, triggerList]);

  return (
    <>
      <Card dark={dark}>
        <Link to="/blog" className="flex items-center gap-4 mb-3">
          <IoArrowBack color={!dark ? "#8f8f8f" : "#fff"} size={32} />
          <span
            className={`${
              !dark ? "text-grayTextContent" : "text-lightText"
            } text-xl sm:text-lg xs:text-sm font-bold`}
          >
            Back
          </span>
        </Link>
        {blogDetail !== undefined ? (
          <>
            <div
              className={`flex gap-2 items-center font-semibold text-xs capitalize mb-2  ${
                !dark ? "text-grayText" : "text-white"
              }`}
            >
              <CiClock2 size={16} strokeWidth={1} />
              {new Date(blogDetail?.updatedAt || "").toLocaleDateString(
                "id-ID",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )}
            </div>
            <div className="flex flex-col gap-5 text-grayTextContent">
              <span
                className={`text-2xl font-bold relative z-10 flex flex-col ${
                  dark && "!text-lightText"
                }`}
              >
                {blogDetail.title}
              </span>
              <img
                className="h-48 w-full object-cover rounded-xl shadow-xl border border-grayBorder"
                loading="lazy"
                src={blogDetail.photo}
                alt={blogDetail.title + "-imgAlt"}
              />
              <span
                className={`container-dcontent-blog text-base font-medium leading-relaxed relative z-10 text-justify ${
                  !dark ? "text-grayText" : "text-white"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: blogDetail.content }} />
              </span>
              <div className="flex items-center gap-4 my-4">
                <span
                  className={`text-sm font-semibold ${
                    dark ? "text-white" : "text-grayText"
                  }`}
                >
                  Share:
                </span>
                <a
                  href={twitterShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Twitter"
                  className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <FaXTwitter size={20} />
                </a>
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="text-gray-500 hover:text-green-500 transition-colors"
                >
                  <FaWhatsapp size={22} />
                </a>
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                  className={`flex items-center gap-2 text-sm font-medium transition-all ${
                    isCopied
                      ? "text-blue-500"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                >
                  <FaLink size={20} />
                  {isCopied ? "Copied!" : ""}
                </button>
              </div>
            </div>
          </>
        ) : (
          Array(4)
            .fill(null)
            .map((_, i) => {
              return (
                <div
                  key={i}
                  className={`h-32 ${
                    !dark
                      ? "bg-[#373737] border-grayBorder text-white"
                      : "bg-lightBg border-lightBorder"
                  } ${
                    i % 2 === 0 ? "h-20" : "h-32"
                  } rounded-xl shadow-xl border border-grayBorder animate-pulse opacity-30`}
                ></div>
              );
            })
        )}
      </Card>
      <Card dark={dark} className="relative !mt-4">
        {listComments !== undefined ? (
          <>
            <DotCircleContent
              dark={dark}
              title={`Comments ${listComments.length ? `(${listComments.length})` : ""}`}
            />
            <CommentSection
              initialComments={listComments}
              dark={dark}
              triggerList={setTriggerList}
              blogId={url.id!}
            />
          </>
        ) : (
          Array(2)
            .fill(null)
            .map((_, i) => {
              return (
                <div
                  key={i}
                  className={`h-32 ${
                    !dark
                      ? "bg-[#373737] border-grayBorder text-white"
                      : "bg-lightBg border-lightBorder"
                  } ${
                    i % 2 === 0 ? "h-20" : "h-32"
                  } rounded-xl shadow-xl border border-grayBorder animate-pulse opacity-30`}
                ></div>
              );
            })
        )}
      </Card>
    </>
  );
};

export default BlogDetailContent;

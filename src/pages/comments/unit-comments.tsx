import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentInput from "./input-comments";
import { CommentInterface } from "../detail";
import { IoPersonCircle, IoTrash } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import ImgPerson from "@/assets/sangar.jpeg";

const guard = process.env.ADMIN_KEY;
interface CommentProps {
  comment: CommentInterface;
  onAddReply: (data: { parentId: string; name: string; text: string }) => void;
  dark: boolean;
  blogId: string;
  toggleReplies?: boolean;
  onDeleteComment: (id: string) => void;
  onToggleLove: (id: string) => void;
}

const UnitComments = ({
  comment,
  onAddReply,
  dark,
  blogId,
  toggleReplies,
  onDeleteComment,
  onToggleLove,
}: CommentProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const isParentComment = !comment.parentId;
  const key = window !== undefined && localStorage.getItem("ADMIN_KEY");

  const variants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "1rem",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const handleReplySubmit = (data: { name: string; text: string }) => {
    onAddReply({
      parentId: comment.id,
      name: data.name,
      text: data.text,
    });
    setIsReplying(false);
  };

  const handleDeleteClick = (id: string) => {
    if (key !== guard) return;

    const confirm = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirm) {
      onDeleteComment(id);
    } else {
      alert("Deletion cancelled or incorrect confirmation");
    }
  };

  const handleLoveClick = (id: string) => {
    if (key !== guard) return;

    const confirm = window.confirm("Are you sure you want to toggle love?");

    if (confirm) {
      onToggleLove(id);
    } else {
      alert("Love toggle cancelled or incorrect confirmation");
    }
  };

  useEffect(() => {
    setShowReplies(true);
  }, [toggleReplies]);

  const renderAdminActions = (
    commentId: string,
    isLoved: boolean,
    isReply = false
  ) => (
    <div
      className={`flex gap-3 items-center ${isReply ? "justify-end mt-2" : ""}`}
    >
      <IoTrash
        cursor="pointer"
        color="#e98074"
        size={16}
        onClick={() => handleDeleteClick(commentId)}
      />
      {isLoved ? (
        <FaHeart
          cursor="pointer"
          color="#e85a4f"
          size={16}
          onClick={() => handleLoveClick(commentId)}
        />
      ) : (
        <CiHeart
          cursor="pointer"
          color={dark ? "#e98074" : "#C0C0C0"}
          size={16}
          onClick={() => handleLoveClick(commentId)}
        />
      )}
    </div>
  );

  const renderLovedIndicator = (isReply = false) => (
    <div
      className={`flex items-center gap-2 ${isReply ? "justify-end mt-1" : ""}`}
    >
      <span
        className={`flex items-center gap-3 text-xs ${dark ? "text-grayText" : "text-grayTextContent"}`}
      >
        Loved by{" "}
        <img
          src={ImgPerson}
          alt="img"
          defaultValue={ImgPerson}
          className="scale-[1.5] rounded-full size-3 "
          srcSet={ImgPerson}
          loading="lazy"
        />
      </span>
    </div>
  );

  return (
    <div className="flex space-x-3 relative">
      <IoPersonCircle size={40} color={dark ? "#e98074" : "#C0C0C0"} />
      <div className="flex-1 min-w-0">
        <div
          className={`${
            !dark
              ? "border-grayBorder bg-[#373737]  text-grayTextContent"
              : "border-lightBorder bg-lightBg text-grayText"
          } rounded-lg p-3 w-full`}
        >
          <div className="flex justify-between items-center gap-8">
            <span className="font-bold truncate flex-1 min-w-0">
              {comment.name}
            </span>
            <span className="text-xs whitespace-nowrap flex-shrink-0">
              {new Date(comment.createdAt)
                .toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace(" pukul", ", ")}
            </span>
          </div>
          <p className="mt-2 text-[15px] leading-relaxed break-words">
            {comment.content}
          </p>
        </div>
        <AnimatePresence>
          {isReplying && (
            <>
              <hr className="my-3" />
              <div className="flex items-start space-x-3">
                <IoPersonCircle
                  size={40}
                  color={dark ? "#e98074" : "#C0C0C0"}
                />
                <CommentInput
                  dark={dark}
                  onSubmit={handleReplySubmit}
                  onCancel={() => setIsReplying(false)}
                  placeholder={`Replying to ${comment.name}...`}
                  isReply={true}
                  blogId={blogId}
                />
              </div>
            </>
          )}
        </AnimatePresence>
        {isParentComment && (
          <div className="mt-3">
            <div className="flex items-center space-x-5 mt-2 ml-1 text-sm text-gray-600 font-medium">
              <span
                onClick={() => setIsReplying(!isReplying)}
                className="cursor-pointer hover:underline"
              >
                {isReplying ? "Cancel reply" : "Reply"}
              </span>

              {comment.replies && comment.replies.length > 0 && (
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="text-indigo-600 font-bold text-sm"
                >
                  {showReplies
                    ? "Hide replies"
                    : `Show ${comment.replies.length} replies`}
                </button>
              )}
              {key === guard && renderAdminActions(comment.id, comment.isLoved)}
              {comment.isLoved && renderLovedIndicator()}
            </div>
          </div>
        )}
        {isParentComment && comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            <AnimatePresence>
              {showReplies && (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4"
                >
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex flex-col text-gray-100">
                      <UnitComments
                        dark={dark}
                        key={reply.id}
                        comment={reply}
                        onAddReply={onAddReply}
                        blogId={blogId}
                        onDeleteComment={onDeleteComment}
                        onToggleLove={onToggleLove}
                      />

                      <div className="flex gap-4 justify-end mt-3">
                        {key === guard &&
                          renderAdminActions(reply.id, reply.isLoved)}
                        {reply.isLoved && renderLovedIndicator()}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitComments;

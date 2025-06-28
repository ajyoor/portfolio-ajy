import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentInput from "./input-comments";
import { CommentInterface } from "../detail";

interface CommentProps {
  comment: CommentInterface;
  onAddReply: (data: { parentId: string; name: string; text: string }) => void;
  dark: boolean;
  blogId: string;
  toggleReplies?: boolean;
}

const UnitComments = ({
  comment,
  onAddReply,
  dark,
  blogId,
  toggleReplies,
}: CommentProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const handleReplySubmit = (data: { name: string; text: string }) => {
    onAddReply({
      parentId: comment.id,
      name: data.name,
      text: data.text,
    });
    setIsReplying(false);
  };

  const variants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "1rem",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const isParentComment = !comment.parentId;

  useEffect(() => {
    setShowReplies(true);
  }, [toggleReplies]);

  return (
    <div className="flex space-x-3 relative">
      <img
        src="https://gerindra.id/wp-content/uploads/2025/06/683d159b98daf-e1748847760788.png"
        className="w-10 h-10 rounded-full flex-shrink-0 z-10 object-cover"
      />
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
                <img
                  src="https://gerindra.id/wp-content/uploads/2025/06/683d159b98daf-e1748847760788.png"
                  className="w-10 h-10 rounded-full flex-shrink-0 z-10 object-cover"
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
                    <UnitComments
                      dark={dark}
                      key={reply.id}
                      comment={reply}
                      onAddReply={onAddReply}
                      blogId={blogId}
                    />
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

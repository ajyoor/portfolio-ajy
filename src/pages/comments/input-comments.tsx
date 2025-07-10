import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Picker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
import Input from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { IoPersonCircle } from "react-icons/io5";

interface CommentInputProps {
  onSubmit: (data: { name: string; text: string }) => void;
  placeholder?: string;
  onCancel?: () => void;
  isReply?: boolean;
  dark: boolean;
  blogId: string;
}

const CommentInput = ({
  onSubmit,
  placeholder = "Share your mind...",
  onCancel,
  isReply = false,
  dark,
}: CommentInputProps) => {
  const [dataComment, setDataComment] = useState({
    name: "",
    text: "",
  });
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setDataComment((prev) => ({
      ...prev,
      text: prev.text + emojiObject.emoji,
    }));
    setShowPicker(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: dataComment.name,
      text: dataComment.text,
    });
    setDataComment({ name: "", text: "" });
  };

  const variants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          {!isReply && (
            <IoPersonCircle size={40} color={dark ? "#e98074" : "#C0C0C0"} />
          )}
          <div className="flex-1">
            <div className="relative space-y-3">
              <Input
                className="!pl-3"
                placeholder="Enter Your Name..."
                value={dataComment.name}
                onChange={(e) =>
                  setDataComment((prev) => ({
                    ...prev,
                    name: e,
                  }))
                }
                dark={dark}
              />
              <Textarea
                ref={inputRef}
                value={dataComment.text}
                onChange={(e) =>
                  setDataComment((prev) => ({ ...prev, text: e.target.value }))
                }
                placeholder={placeholder}
                dark={dark}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-4 text-gray-500 relative">
                <FaRegSmile
                  onClick={() => setShowPicker(!showPicker)}
                  className={`cursor-pointer ${dark ? "text-lightBg hover:text-lightText" : "text-grayText hover:text-grayTextContent"} transition-colors`}
                  size={22}
                />
                <AnimatePresence>
                  {showPicker && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute top-8 left-0 z-10"
                    >
                      <Picker onEmojiClick={onEmojiClick} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center space-x-2">
                {/* {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="text-grayText font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-colors w-28 sm:w-auto"
                  >
                    Cancel
                  </button>
                )} */}
                <button
                  type="submit"
                  disabled={
                    !dataComment.name.trim() && !dataComment.text.trim()
                  }
                  className={`${dark ? "bg-lightText disabled:text-grayTextContent disabled:bg-lightBg" : "bg-blue-900 disabled:text-grayTextContent disabled:bg-grayText"}  text-white font-semibold px-6 py-2 rounded-md  disabled:cursor-not-allowed transition-colors w-28 sm:w-auto`}
                >
                  {isReply ? "Reply" : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CommentInput;

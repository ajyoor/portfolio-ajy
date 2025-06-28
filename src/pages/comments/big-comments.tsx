import UnitComments from "./unit-comments";
import CommentInput from "./input-comments";
import { CommentInterface } from "../detail";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/components/Toast";

interface BigCommentsProps {
  initialComments: CommentInterface[];
  dark: boolean;
  triggerList: (value: boolean) => void;
  blogId: string;
}

const BigComments = ({
  initialComments,
  dark,
  triggerList,
  blogId,
}: BigCommentsProps) => {
  const { showToast } = useToast();
  const [showReplies, setShowReplies] = useState(false);

  const handleAddComment = async (data: { name: string; text: string }) => {
    const payload = {
      name: data.name,
      content: data.text,
    };
    try {
      await axios.post(
        `https://portfolio-ajy.onrender.com/blogs/${blogId}/comments`,
        payload
      );
      showToast("Comment added successfully!", "success");
      triggerList(true);
    } catch (error) {
      console.log(error);
      showToast("Failed to add comment!", "error");
    }
  };

  const handleAddReply = async (data: {
    parentId: string;
    name: string;
    text: string;
  }) => {
    const payload = {
      name: data.name,
      content: data.text,
      parentId: data.parentId,
    };
    try {
      await axios.post(
        `https://portfolio-ajy.onrender.com/blogs/${blogId}/comments`,
        payload
      );
      showToast("Reply added successfully!", "success");
      triggerList(true);
      setShowReplies(true);
    } catch (error) {
      console.log(error);
      showToast("Failed to add reply!", "error");
    }
  };

  return (
    <>
      <div className="space-y-6 mt-6">
        {initialComments.length === 0 ? (
          <div
            className={`text-center ${dark ? "text-white" : "text-grayText"} font-bold text-base`}
          >
            Blog not comments yet, be the first!.
          </div>
        ) : (
          <>
            {initialComments
              .filter((comment) => !comment.parentId)
              .map((comment) => (
                <UnitComments
                  key={comment.id}
                  comment={comment}
                  onAddReply={handleAddReply}
                  dark={dark}
                  blogId={blogId}
                  toggleReplies={showReplies}
                />
              ))}
          </>
        )}
        <hr className={`${dark ? "border-white" : "border-grayText"}`} />
        <CommentInput dark={dark} onSubmit={handleAddComment} blogId={blogId} />
      </div>
    </>
  );
};

export default BigComments;

import React from "react";

interface TextareaInterface {
  ref?: React.RefObject<HTMLTextAreaElement>;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  dark?: boolean;
  maxLength?: number;
}

export const Textarea: React.FC<TextareaInterface> = ({
  ref,
  value,
  onChange,
  placeholder,
  rows = 3,
  dark,
  maxLength,
}) => {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-lg resize-none focus:outline-none text-sm transition-colors ${
        !dark
          ? "border-grayBorder bg-[#373737]  text-white"
          : "border-lightBorder bg-lightBg text-grayText"
      }`}
      rows={rows}
      placeholder={placeholder}
      maxLength={maxLength}
    ></textarea>
  );
};

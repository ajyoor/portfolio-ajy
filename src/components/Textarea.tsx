import React from "react";

interface TextareaInterface
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.RefObject<HTMLTextAreaElement>;
  dark?: boolean;
}

export const Textarea: React.FC<TextareaInterface> = ({
  ref,
  value,
  onChange,
  placeholder,
  rows = 3,
  dark,
  maxLength,
  className,
  ...props
}) => {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-lg resize-none focus:outline-none text-sm transition-colors ${
        !dark
          ? "border-grayBorder bg-[#373737] text-white"
          : "border-lightBorder bg-lightBg text-grayText"
      } ${className}`}
      rows={rows}
      placeholder={placeholder}
      maxLength={maxLength}
      {...props}
    ></textarea>
  );
};

import React, { useRef } from "react";
import "./style.css";
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";

export default function ExpandingTextArea({
  className,
  style,
  placeholder,
  value,
  onChange,
}: {
  className?: string;
  style?: Record<string, any>;
  placeholder?: string;
  value?: string;
  onChange?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value!);

  return (
    <textarea
      className={`${className} border-0 focus:border-b-[1px]`}
      style={style}
      onChange={onChange}
      placeholder={placeholder}
      ref={textAreaRef}
      rows={1}
      value={value}
    />
  );
}

import React, { useRef } from "react";
import "./style.css";
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";

export default function ExpandingTextArea({
  name,
  id,
  className,
  style,
  placeholder,
  value,
  onChange,
}: {
  name?: string;
  id?: string;
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
      id={id}
      name={name}
      className={`${className} h-100 border-0 border-black focus:border-2`}
      style={style}
      onChange={onChange}
      placeholder={placeholder}
      ref={textAreaRef}
      rows={1}
      value={value}
    />
  );
}

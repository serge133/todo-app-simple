import { ChangeEvent, RefObject } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

type Props = {
  setValue: (s: string) => void;
  value: string;
  onEnter: () => void;
  className?: string;
  placeholder?: string;
  reference?: RefObject<HTMLTextAreaElement> | null;
  id?: string;
};

export default function TaskField(props: Props) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    props.setValue(e.target.value);
  return (
    <ReactTextareaAutosize
      className={`rounded-lg bg-inherit border border-slate-700 px-5 py-2.5 resize-none focus:outline-none ${props.className}`}
      ref={props.reference!}
      placeholder={props.placeholder}
      onChange={handleChange}
      value={props.value}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          props.onEnter();
        }
      }}
    />
  );
}

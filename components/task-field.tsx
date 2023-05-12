import { ChangeEvent } from "react";

type Props = {
  setValue: (s: string) => void;
  value: string;
  onEnter: () => void;
  className?: string;
  placeholder?: string;
};

export default function TaskField(props: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.setValue(e.target.value);
  return (
    <input
      className={`rounded-lg bg-inherit border border-slate-700 px-5 py-2.5 focus:outline-none ${props.className}`}
      placeholder={props.placeholder}
      onChange={handleChange}
      value={props.value}
      onKeyDown={(e) => {
        if (e.key === "Enter") props.onEnter();
      }}
    />
  );
}

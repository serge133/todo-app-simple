import { ChangeEvent } from "react";

type Props = {
  setValue: (s: string) => void;
  value: string;
  onEnter: () => void;
};

export default function TaskField(props: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    props.setValue(e.target.value);
  return (
    <input
      className="rounded-lg bg-inherit border px-5 py-2.5 focus:outline-none"
      placeholder="Workout due +4days priority 3 label sports"
      onChange={handleChange}
      value={props.value}
      onKeyDown={(e) => {
        if (e.key === "Enter") props.onEnter();
      }}
    />
  );
}

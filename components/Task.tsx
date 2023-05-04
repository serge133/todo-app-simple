import { TaskG } from "@/pages";

interface Props extends TaskG {}
export default function Task(props: Props) {
  const priorities = [
    "border-white",
    "border-blue-500",
    "border-amber-500",
    "border-red-800",
  ];

  const Tag = ({ name, children }: { name: string; children: string }) => (
    <span className="bg-slate-500 white rounded-md p-1 ml-2">
      {name}: {children}
    </span>
  );

  return (
    <div
      className={[
        "border-2 p-5 rounded-lg mb-3",
        priorities[props.priority],
      ].join(" ")}
      key={props.id}
    >
      {props.title}
      <Tag name="due">{props.due.toLocaleString()}</Tag>
      <Tag name="priority">{props.priority.toString()}</Tag>
      <Tag name="label">{props.label.toString()}</Tag>
    </div>
  );
}

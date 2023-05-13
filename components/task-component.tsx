import { ReactNode } from "react";
import CheckBox from "./checkbox";

type Props = {
  id: number;
  priority: number;
  title: string;
  due: string;
  label: string;
  complete: boolean;
  toggleComplete: (taskId: number) => void;
  overdue: boolean;
  controller?: ReactNode;
  daysTillDue: number;
};

export default function TaskComponent(props: Props) {
  const priorities = ["bg-white", "bg-green-500", "bg-amber-500", "bg-red-500"];
  const priorities_border = [
    "border-slate-700",
    "border-green-500",
    "border-amber-500",
    "border-red-800",
  ];

  const daysTillDueColors = [
    "",
    "text-red-500",
    "text-amber-500",
    "text-green-500",
  ]; // 0 days, 1 day, 2 days, 3 days

  const Tag = ({
    name,
    children,
    className,
  }: {
    name?: string;
    children?: string | ReactNode;
    className?: string;
  }) => (
    <span className={`${className} rounded-md p-1 mr-2 text-sm`}>
      {name && <span>{name}: </span>}
      {children}
    </span>
  );

  const handleComplete = () => props.toggleComplete(props.id);
  return (
    <div
      className={[
        "border p-2 rounded-lg mb-2 relative",
        props.complete ? "border-slate-700" : priorities_border[props.priority],
      ].join(" ")}
      key={props.id}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <CheckBox checked={props.complete} onClick={handleComplete} />
          {props.controller}
        </div>
        <p className={props.complete ? "line-through text-gray-500" : ""}>
          {props.title}
        </p>
        <section className={props.complete ? "opacity-25" : ""}>
          <Tag className={priorities[props.priority]} />
          <Tag
            name="due"
            className={`bg-transparent ${
              props.daysTillDue <= 3 && props.daysTillDue > 0
                ? daysTillDueColors[props.daysTillDue]
                : ""
            }`}
          >
            {props.due}
            {props.daysTillDue ? (
              <span>
                {" "}
                ({"<"}
                {props.daysTillDue} Days)
              </span>
            ) : null}
            {props.overdue && <span className="text-red-500"> (Overdue)</span>}
          </Tag>
          <Tag name="label">
            <span className="text-red-500 font-bold">
              {props.label.toString()}
            </span>
          </Tag>
        </section>
      </div>
    </div>
  );
}

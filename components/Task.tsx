import CheckBox from "./checkbox";

type Props = {
  id: number;
  priority: number;
  title: string;
  due: string;
  label: string;
  complete: boolean;
  toggleComplete: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  moveUp: (taskId: number) => void;
  moveDown: (taskId: number) => void;
};
export default function TaskComponent(props: Props) {
  const priorities = ["bg-black", "bg-blue-500", "bg-amber-500", "bg-red-800"];
  const priorities_border = [
    "border-white",
    "border-blue-500",
    "border-amber-500",
    "border-red-800",
  ];

  const Tag = ({
    name,
    children,
    bg,
  }: {
    name: string;
    children: string;
    bg: string;
  }) => (
    <span className={`${bg} white rounded-md p-1 mr-2 text-xs`}>
      {name}: {children}
    </span>
  );

  return (
    <div
      className={[
        "border-2 p-2 rounded-lg mb-3 relative",
        props.complete ? "border-gray-500" : priorities_border[props.priority],
      ].join(" ")}
      key={props.id}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <CheckBox
            checked={props.complete}
            onClick={() => props.toggleComplete(props.id)}
          />
          <div
            className="hover:text-red-600 cursor-pointer absolute right-1 top-0"
            onClick={() => props.deleteTask(props.id)}
          >
            DELETE
          </div>
          <div
            className="hover:text-red-500 cursor-pointer"
            onClick={() => props.moveUp(props.id)}
          >
            UP
          </div>
          <div
            className="hover:text-red-500 cursor-pointer"
            onClick={() => props.moveDown(props.id)}
          >
            DOWN
          </div>
        </div>
        <p className={props.complete ? "line-through text-gray-500" : ""}>
          {props.title}
        </p>
        <section className={props.complete ? "opacity-25" : ""}>
          <Tag
            name="due"
            bg={props.due === "never" ? "bg-slate-500" : "bg-amber-500"}
          >
            {props.due}
          </Tag>
          <Tag
            name="label"
            bg={props.label === "none" ? "bg-slate-500" : "bg-red-500"}
          >
            {props.label.toString()}
          </Tag>
          <Tag name="priority" bg={priorities[props.priority]}>
            {props.priority.toString()}
          </Tag>
        </section>
      </div>
    </div>
  );
}

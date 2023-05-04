import CheckBox from "./checkbox";

type Props = {
  id: number;
  priority: number;
  title: string;
  due: string | Date;
  label: string;
  complete: boolean;
  toggleComplete: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  moveUp: (taskId: number) => void;
  moveDown: (taskId: number) => void;
};
export default function TaskComponent(props: Props) {
  const priorities = [
    "border-white",
    "border-blue-500",
    "border-amber-500",
    "border-red-800",
  ];

  const Tag = ({ name, children }: { name: string; children: string }) => (
    <span className="bg-slate-500 white rounded-md p-1 mr-2">
      {name}: {children}
    </span>
  );

  return (
    <div
      className={[
        "border-2 p-2 rounded-lg mb-3",
        props.complete ? "border-gray-500" : priorities[props.priority],
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
            className="font-thin hover:text-red-500 cursor-pointer"
            onClick={() => props.deleteTask(props.id)}
          >
            DELETE
          </div>
          <div
            className="font-thin hover:text-red-500 cursor-pointer"
            onClick={() => props.moveUp(props.id)}
          >
            UP
          </div>
          <div
            className="font-thin hover:text-red-500 cursor-pointer"
            onClick={() => props.moveDown(props.id)}
          >
            DOWN
          </div>
        </div>
        <p className={props.complete ? "line-through text-gray-500" : ""}>
          {props.title}
        </p>
        <section className={props.complete ? "opacity-25" : ""}>
          <Tag name="due">{props.due.toLocaleString()}</Tag>
          <Tag name="priority">{props.priority.toString()}</Tag>
          <Tag name="label">{props.label.toString()}</Tag>
        </section>
      </div>
    </div>
  );
}

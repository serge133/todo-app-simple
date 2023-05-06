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
  editTask: (taskId: number, originalText: string) => void;
  originalText: string;
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

  const handleEdit = () => props.editTask(props.id, props.originalText);
  const handleComplete = () => props.toggleComplete(props.id);
  const handleDelete = () => props.deleteTask(props.id);
  const handleUP = () => props.moveUp(props.id);
  const handleDown = () => props.moveDown(props.id);

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
          <CheckBox checked={props.complete} onClick={handleComplete} />
          <section className=" absolute right-1 top-0">
            <div
              onClick={handleEdit}
              className="inline mr-2 hover:text-red-500 cursor-pointer"
            >
              EDIT
            </div>
            <div
              className="hover:text-red-600 cursor-pointer inline"
              onClick={handleDelete}
            >
              DELETE
            </div>
          </section>
          <div className="hover:text-red-500 cursor-pointer" onClick={handleUP}>
            UP
          </div>
          <div
            className="hover:text-red-500 cursor-pointer"
            onClick={handleDown}
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

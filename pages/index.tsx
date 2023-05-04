import Task from "@/components/Task";
import { useState } from "react";

export type TaskType = {
  id: number;
  title: string;
  priority: number;
  due: string;
};

function future(days: number): Date {
  var dayMs = 86400000;
  var ts = dayMs * days;
  var now = +new Date();
  var fts = now + ts;
  return new Date(fts);
}

export class TaskG {
  id: number;
  title: string;
  priority: number;
  due: string | Date;
  label: string;
  private _valid: boolean = true;
  private _statusMsg: string = "";

  constructor(
    title: string = "Unnamed",
    priority: number = 0,
    due: string | 0,
    label: string | 0
  ) {
    this.id = Math.random();
    this.title = title;

    if (!isNaN(+priority)) {
      this.priority = Math.min(+priority, 3);
    } else {
      this._valid = false;
      this._statusMsg = "Something wrong with the priority";
      this.priority = 0;
    }

    switch (due) {
      case "now":
        this.due = new Date();
        break;
      case "tomorrow":
      case "tom":
        this.due = future(1);
        break;
      case 0:
        this.due = "never";
        break;
      default:
        this._valid = false;
        this._statusMsg = "Invalid Date";
        this.due = due;
    }

    this.label = label ? label.toString() : "none";
  }

  isValidTask(): boolean {
    return this._valid;
  }

  getStatusMsg(): string {
    return this._statusMsg;
  }
}

export default function Home() {
  const [taskField, setTaskField] = useState("");
  const [tasks, setTasks] = useState<TaskG[]>([]);

  const parseTask = (s: string): [Map<any, any>, string] => {
    const actionMap = new Map([
      ["due", 0],
      ["priority", 0],
      ["p", 0],
      ["label", 0],
    ] as const);
    const taskFieldList = s.trim().split(" ");
    const strippedField: string[] = [];

    for (let i = 0; i < taskFieldList.length; i++) {
      const word = taskFieldList[i];
      if (!actionMap.has(word)) {
        strippedField.push(word);
        continue;
      }
      if (i === taskFieldList.length - 1) {
        actionMap.set(word, "null");
        continue;
      }
      const action = taskFieldList[i + 1];
      actionMap.set(word, action);
      i += 1;
    }

    return [actionMap, strippedField.join(" ").trim()];
  };

  const submitTask = () => {
    const [actionMap, field] = parseTask(taskField);

    if (!field) {
      console.log("Field is empty");
      return;
    }
    const newTask = new TaskG(
      field,
      actionMap.get("priority") || actionMap.get("p"),
      actionMap.get("due"),
      actionMap.get("label")
    );

    if (!newTask.isValidTask()) {
      console.log(newTask.getStatusMsg());
      return;
    }
    setTasks(tasks.concat([newTask]));
    setTaskField("");
    console.log("Submitting task!!!!");
  };

  const TaskList = (
    <section className="grow overflow-y-auto pt-2">
      {tasks.map((t) => (
        <Task
          key={t.id}
          id={t.id}
          title={t.title}
          priority={t.priority}
          label={t.label}
          due={t.due}
        />
      ))}
    </section>
  );

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between p-5">
      <div className="flex flex-col p-3 w-full h-full border-white border-2 bg-black rounded-lg">
        <input
          className="rounded-lg bg-inherit border-2 px-5 py-2.5 focus:outline-none"
          placeholder="Todo list item"
          onChange={(e) => setTaskField(e.target.value)}
          value={taskField}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitTask();
          }}
        />
        {TaskList}
      </div>
    </main>
  );
}

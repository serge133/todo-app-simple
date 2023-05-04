import TaskComponent from "@/components/Task";
import Navbar from "@/components/navbar";
import Task from "@/models/task";
import { useState } from "react";

export default function Home() {
  const [taskField, setTaskField] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const parseTask = (s: string): [Map<any, any>, string] => {
    const actionMap = new Map([
      ["due", 0],
      ["priority", 0],
      ["pr", 0],
      ["label", 0],
      ["lb", 0],
    ] as const);
    const taskFieldList = s.trim().split(" ");
    const strippedField: string[] = [];

    for (let i = 0; i < taskFieldList.length; i++) {
      const word: string = taskFieldList[i];
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
    const newTask = new Task(
      field,
      actionMap.get("priority") || actionMap.get("pr"),
      actionMap.get("due"),
      actionMap.get("label") || actionMap.get("lb")
    );

    if (!newTask.isValidTask()) {
      console.log(newTask.getStatusMsg());
      return;
    }
    setTasks([...tasks, newTask]);
    setTaskField("");
    console.log("Submitting task!!!!");
  };

  const toggleComplete = (taskId: number) => {
    const newTasks = tasks.map((t) => {
      if (t.id === taskId) t.toggleComplete();
      return t;
    });

    setTasks(newTasks);
  };

  const deleteTask = (taskId: number) => {
    const newTasks = tasks.filter((t) => {
      if (t.id === taskId) return;
      return t;
    });

    setTasks(newTasks);
  };

  const moveUp = (taskId: number) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === 0) {
      console.log("Can not move task up");
      return;
    }
    const newTasks = [...tasks];
    [newTasks[taskIndex - 1], newTasks[taskIndex]] = [
      newTasks[taskIndex],
      newTasks[taskIndex - 1],
    ];

    setTasks(newTasks);
  };

  const moveDown = (taskId: number) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === tasks.length - 1) {
      console.log("Can not move task down");
      return;
    }
    const newTasks = [...tasks];
    [newTasks[taskIndex + 1], newTasks[taskIndex]] = [
      newTasks[taskIndex],
      newTasks[taskIndex + 1],
    ];

    setTasks(newTasks);
  };
  const TaskList = (
    <section className="grow overflow-y-auto pt-2">
      {tasks.map((t) => (
        <TaskComponent
          key={t.id}
          id={t.id}
          title={t.title}
          priority={t.priority}
          label={t.label}
          due={t.due}
          complete={t.complete}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          moveUp={moveUp}
          moveDown={moveDown}
        />
      ))}
    </section>
  );

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between px-5 pd-5 pt-10">
      <Navbar currPage="HOME" />
      <div className="flex flex-col p-3 w-full h-full border-white border-2 bg-black rounded-lg">
        <input
          className="rounded-lg bg-inherit border-2 px-5 py-2.5 focus:outline-none"
          placeholder="..."
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

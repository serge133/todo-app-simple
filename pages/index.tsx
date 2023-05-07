import TaskComponent from "@/components/Task";
import Navbar from "@/components/navbar";
import Task from "@/models/task";
import { useEffect, useState } from "react";
import { randomCatchphrase } from "@/util";
import {
  deleteTaskDB,
  fetchTasksDB,
  initializeDB,
  saveTaskDB,
  updateTaskDB,
} from "@/database";
import ListController from "@/components/list_controller";
import { TaskOrdering } from "@/types";
// import { writeDB } from "@/database";

// Creates copy not in place
const reorderTasksCustom = (ts: Task[]): Task[] => {
  const newTasks = [...ts];
  newTasks.sort((a, b) => {
    if (a.order > b.order) {
      return 1;
    }

    if (a.order < b.order) {
      return -1;
    }
    return 0;
  });
  return newTasks;
};
// Creates copy not in place
const reorderTasksDueDate = (ts: Task[]): Task[] => {
  const newTasks = [...ts];
  newTasks.sort((a, b) => {
    if (a.dueMS > b.dueMS) {
      return 1;
    }

    if (a.dueMS < b.dueMS) {
      return -1;
    }
    return 0;
  });
  return newTasks;
};

export default function Home() {
  const [taskField, setTaskField] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  // TASK FILTERS
  const [labelFilter, setLabelFilter] = useState<string>("");
  const [hideCompleteTasks, setHideCompleteTasks] = useState(true);
  const [sortByFilter, setSortByFilter] = useState<TaskOrdering>("custom");
  // ---------------------------

  // SETS RANDOM CATCH PHRASE
  const [catchphrase, setCatchphrase] = useState<string>("");
  useEffect(
    () => setCatchphrase(randomCatchphrase()),
    [randomCatchphrase, setCatchphrase]
  );
  // -----------------------------------------------

  useEffect(() => initializeDB(), []);
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
      // @ts-ignore
      if (!actionMap.has(word)) {
        strippedField.push(word);
        continue;
      }
      if (i === taskFieldList.length - 1) {
        // @ts-ignore
        actionMap.set(word, "null");
        continue;
      }
      const action = taskFieldList[i + 1];
      // @ts-ignore
      actionMap.set(word, action);
      i += 1;
    }

    return [actionMap, strippedField.join(" ").trim()];
  };

  useEffect(() => {
    const fetchTasks = async () => {
      let data = await fetchTasksDB();
      data = reorderTasksCustom(data);
      setTasks(data);
    };
    fetchTasks().catch(console.log);
  }, []);

  const reorderTasks = (ordering: TaskOrdering) => {
    if (ordering === "custom") setTasks((prev) => reorderTasksCustom(prev));
    else if (ordering === "duedate")
      setTasks((prev) => reorderTasksDueDate(prev));
    setSortByFilter(ordering);
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
      actionMap.get("label") || actionMap.get("lb"),
      tasks.length,
      taskField
    );

    if (!newTask.isValidTask()) {
      console.log(newTask.getStatusMsg());
      return;
    }

    saveTaskDB(newTask);
    setTasks([...tasks, newTask]);
    setTaskField("");
    console.log("Submitting task!!!!");
  };

  const toggleComplete = (taskId: number) => {
    const newTasks = tasks.map((t) => {
      if (t.id === taskId) {
        t.complete = !t.complete;
        updateTaskDB(t);
      }
      return t;
    });

    setTasks(newTasks);
  };

  const deleteTask = (taskId: number) => {
    const newTasks = tasks.filter((t) => {
      if (t.id === taskId) return;
      return t;
    });

    deleteTaskDB(taskId);
    setTasks(newTasks);
  };

  const moveUp = (taskId: number) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === 0) {
      console.log("Can not move task up");
      return;
    }
    const newTasks = [...tasks];
    // Swap the orders
    newTasks[taskIndex].order = taskIndex - 1;
    newTasks[taskIndex - 1].order = taskIndex;

    [newTasks[taskIndex - 1], newTasks[taskIndex]] = [
      newTasks[taskIndex],
      newTasks[taskIndex - 1],
    ];

    updateTaskDB(newTasks[taskIndex]);
    updateTaskDB(newTasks[taskIndex - 1]);
    setTasks(newTasks);
  };

  const moveDown = (taskId: number) => {
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === tasks.length - 1) {
      console.log("Can not move task down");
      return;
    }
    const newTasks = [...tasks];
    // Swap the orders
    newTasks[taskIndex].order = taskIndex + 1;
    newTasks[taskIndex + 1].order = taskIndex;

    [newTasks[taskIndex + 1], newTasks[taskIndex]] = [
      newTasks[taskIndex],
      newTasks[taskIndex + 1],
    ];

    updateTaskDB(newTasks[taskIndex]);
    updateTaskDB(newTasks[taskIndex + 1]);
    setTasks(newTasks);
  };

  const editTask = (taskId: number, originalText: string) => {
    setTaskField(originalText);
    deleteTask(taskId);
  };

  const taskFilterPredicate = (task: Task) => {
    if (
      labelFilter &&
      !task.label.toLowerCase().includes(labelFilter.trim().toLowerCase())
    )
      return false;
    if (hideCompleteTasks && task.complete) return false;
    return true;
  };

  const TaskList = (
    <section className="grow overflow-y-auto pt-2">
      {tasks.filter(taskFilterPredicate).map((t) => (
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
          editTask={editTask}
          originalText={t.originalText}
          disableUpDownControl={sortByFilter !== "custom"}
        />
      ))}
      {tasks.length === 0 && <p className="italic">{catchphrase}</p>}
    </section>
  );

  // const Seperator = (
  //   <section>
  //     <h1 className="text-3xl">Today</h1>
  //     <hr />
  //   </section>
  // );

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between px-2 pd-2 pt-10">
      <Navbar
        currPage="HOME"
        numTasks={tasks.filter((x) => !x.complete).length}
      />
      <div className="flex flex-col p-2 w-full h-full border-white bg-black rounded-lg border overflow-hidden">
        <input
          className="rounded-lg bg-inherit border px-5 py-2.5 focus:outline-none"
          placeholder="Workout due +4days priority 3 label sports"
          onChange={(e) => setTaskField(e.target.value)}
          value={taskField}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitTask();
          }}
        />
        <ListController
          labelFilterVal={labelFilter}
          onChangeLabel={setLabelFilter}
          hideComplete={hideCompleteTasks}
          setHideComplete={setHideCompleteTasks}
          sortBy={sortByFilter}
          reorder={reorderTasks}
        />
        {TaskList}
      </div>
    </main>
  );
}

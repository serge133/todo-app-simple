import TaskComponent from "@/components/task-component";
import Navbar from "@/components/navbar";
import Task from "@/models/task";
import ListController from "@/components/list-controller";
import { useEffect, useState } from "react";
import { calcDaysTillDue, randomCatchphrase } from "@/functions/util";
import {
  archiveTaskDB,
  deleteTaskDB,
  fetchTasksDB,
  initializeDB,
  saveTaskDB,
  updateTaskDB,
} from "@/database";
import { TaskOrdering } from "@/types";
import parseTaskString from "@/functions/parse-task-string";
import TaskField from "@/components/task-field";

// Creates copy not in place
const reorder = {
  custom: (ts: Task[]): Task[] => {
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
  },
  duedate: (ts: Task[]): Task[] => {
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
  },
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

  // ! DOES NOT ARCHIVE TASK
  const deleteTask = (taskId: number) => {
    const newTasks = tasks.filter((t) => {
      if (t.id === taskId) return;
      return t;
    });

    const thisTask = tasks.find((t) => t.id === taskId);
    if (!thisTask) return;
    deleteTaskDB(taskId);
    setTasks(newTasks);
  };

  useEffect(() => {
    // set defaults on list controller
    const listControllerComplete: string | null = localStorage.getItem(
      "listControllerHideComplete"
    );
    const listFilteringMethod: string | null =
      localStorage.getItem("filteringMethod");

    setHideCompleteTasks(
      listControllerComplete === "true" || !listControllerComplete
    );

    let tmp: TaskOrdering = "custom";
    if (!listFilteringMethod || listFilteringMethod === "custom") {
      // Default
      tmp = "custom";
      setSortByFilter("custom");
    } else {
      tmp = "duedate";
      setSortByFilter("duedate");
    }
    // -----------------
    initializeDB();

    // tasks that are completed and 1 day past the due date are archived
    // const expireMS: number = +new Date() - 86400000;
    // Tasks that are completed and past the due date are immediately archived
    const todayMS: number = +new Date();
    const newTasks: Task[] = [];
    const fetchTasks = async () => {
      let data: Task[] = (await fetchTasksDB()).filter((t) => {
        // ? CLEAN UP
        if (t.complete && (!t.hasDueDate || todayMS > t.dueMS)) {
          if (t.repeat) {
            const newTask: Task | false = parseTaskString(
              t.originalText,
              t.order
            );
            if (newTask) {
              newTask.id = t.id;
              newTasks.push(newTask);
              updateTaskDB(newTask);
              return false;
            }
          }
          archiveTaskDB(t).then(() => deleteTaskDB(t.id));
          return false;
        }
        return true;
      });

      // each task comes with its own how many days till its due
      data = data.concat(newTasks);
      data.map((t) => {
        if (t.hasDueDate) {
          t.daysTillDue = calcDaysTillDue(t.dueMS);
        }
      });
      data = reorder[tmp](data);
      setTasks(data);
    };
    fetchTasks().catch(console.log);
  }, []);

  const reorderTasks = (ordering: TaskOrdering) => {
    setTasks((prev) => reorder[ordering](prev));
    setSortByFilter(ordering);
  };

  const submitTask = () => {
    const newTask = parseTaskString(taskField, tasks.length);
    if (!newTask) return;
    // If there is a new task but parsing the task field failed
    if (!newTask.isValidTask()) {
      console.log(newTask.getStatusMsg());
      return;
    }

    saveTaskDB(newTask);
    setTasks(reorder[sortByFilter]([...tasks, newTask]));
    setTaskField("");
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
    window.scrollTo(0, 0);
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

  const TaskController = ({
    onEdit,
    onArchive,
    onUp,
    onDown,
    disableUpDownControl,
  }: {
    onEdit: () => void;
    onArchive: () => void;
    onUp: () => void;
    onDown: () => void;
    disableUpDownControl: boolean;
  }) => (
    <div>
      <section className="absolute right-1 top-0">
        <div
          onClick={onEdit}
          className="inline mr-2 hover:text-red-500 cursor-pointer"
        >
          EDIT
        </div>
        <div
          className="hover:text-red-600 cursor-pointer inline"
          onClick={onArchive}
        >
          ARCHIVE
        </div>
      </section>
      {!disableUpDownControl && (
        <>
          <div
            className="inline hover:text-red-500 cursor-pointer"
            onClick={onUp}
          >
            UP{" "}
          </div>
          <div
            className="inline hover:text-red-500 cursor-pointer"
            onClick={onDown}
          >
            DOWN
          </div>
        </>
      )}
    </div>
  );

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between pt-12">
      <Navbar
        currPage="HOME"
        numTasks={tasks.filter((x) => !x.complete).length}
      />
      <div className="flex flex-col px-2 pt-2 w-full border-slate-700 bg-slate-900 rounded-lg border">
        <TaskField
          setValue={setTaskField}
          value={taskField}
          onEnter={submitTask}
          placeholder="Workout due +4days priority 3 label sports"
        />
        <ListController
          labelFilterVal={labelFilter}
          onChangeLabel={setLabelFilter}
          hideComplete={hideCompleteTasks}
          setHideComplete={setHideCompleteTasks}
          sortBy={sortByFilter}
          reorder={reorderTasks}
        />
        <section className="grow pt-2">
          {tasks.filter(taskFilterPredicate).map((t) => {
            if (t.daysTillDue === undefined) {
              return (
                <p key={t.id}>
                  Could not render {t.id} because days until task was due was
                  undefined
                </p>
              );
            }
            const disableUpDownControl = sortByFilter !== "custom";
            const handleEdit = () => editTask(t.id, t.originalText);
            const handleArchive = () => {
              if (confirm(`Are you sure you want to archive ${t.title}?`)) {
                archiveTaskDB(t);
                deleteTask(t.id);
              }
            };
            const handleUP = () => {
              if (disableUpDownControl) return;
              moveUp(t.id);
            };
            const handleDown = () => {
              if (disableUpDownControl) return;
              moveDown(t.id);
            };
            const isOverdue: boolean = !t.complete && t.daysTillDue <= 0;
            return (
              <TaskComponent
                key={t.id}
                id={t.id}
                title={t.title}
                priority={t.priority}
                label={t.label}
                due={t.due}
                overdue={isOverdue}
                hasDueDate={t.hasDueDate}
                daysTillDue={t.daysTillDue}
                complete={t.complete}
                toggleComplete={toggleComplete}
                controller={
                  <TaskController
                    onEdit={handleEdit}
                    onUp={handleUP}
                    onDown={handleDown}
                    disableUpDownControl={disableUpDownControl}
                    onArchive={handleArchive}
                  />
                }
                repeat={t.repeat}
              />
            );
          })}
          {tasks.length === 0 && (
            <p className="italic my-5 text-slate-400">{catchphrase}</p>
          )}
        </section>
      </div>
    </main>
  );
}

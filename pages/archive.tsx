import Navbar from "@/components/navbar";
import TaskComponent from "@/components/task-component";
import {
  deleteArchivedTaskDB,
  fetchArchivedTasks,
  initializeDB,
  saveTaskDB,
} from "@/database";
import parseTaskString from "@/functions/parse-task-string";
import Task from "@/models/task";
import { useEffect, useState } from "react";

export default function ArchivePage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeDB();
    const fetchTasks = async () => {
      const tasks = await fetchArchivedTasks();
      const parsedTasks: Task[] = [];
      for (const task of tasks) {
        const newTask = parseTaskString(task.originalText, 0);
        if (newTask) {
          newTask.id = task.id;
          parsedTasks.push(newTask);
        } else console.log("Something severely wrong happened");
      }
      setTasks(parsedTasks);
    };
    fetchTasks().catch(console.log);
  }, []);

  const deleteArchivedTask = (taskId: number) => {
    const newArchivedTasks = tasks.filter((t) => {
      if (t.id === taskId) return false;
      return true;
    });

    deleteArchivedTaskDB(taskId);
    setTasks(newArchivedTasks);
  };

  // Will update the due date
  const restoreArchivedTask = (task: Task) => {
    saveTaskDB(task)
      .then(() => deleteArchivedTask(task.id))
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between px-2 pd-2 pt-12">
      <Navbar currPage="ARCHIVE" />
      <div className="flex flex-col px-2 pt-2 w-full border-slate-700 bg-slate-900 rounded-lg border">
        {tasks.map((t) => {
          if (!t || !t.isValidTask())
            return <p className="text-red italic">Failed to parse a task</p>;
          return (
            <div
              className="border border-slate-700 rounded-lg px-2 pd-2 pt-8 mb-2 relative"
              key={t.id}
            >
              <section className="absolute top-2 right-2">
                <div
                  onClick={() => deleteArchivedTask(t.id)}
                  className="inline mr-2 hover:text-red-500 cursor-pointer"
                >
                  DELETE
                </div>
                <div
                  onClick={() => restoreArchivedTask(t)}
                  className="hover:text-red-600 cursor-pointer inline"
                >
                  RESTORE
                </div>
              </section>
              <div className="mb-2 font-bold">{t.originalText}</div>
              <TaskComponent
                id={t.id}
                title={t.title}
                priority={t.priority}
                label={t.label}
                due={t.due}
                complete={false}
                toggleComplete={() => {}}
                overdue={t.daysTillDue <= 0}
                daysTillDue={t.daysTillDue}
                hasDueDate={t.hasDueDate}
                repeat={t?.repeat}
              />
            </div>
          );
        })}
        {tasks.length === 0 && <p className="italic">Nothing here</p>}
      </div>
    </main>
  );
}

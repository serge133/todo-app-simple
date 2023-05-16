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
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  useEffect(() => {
    initializeDB();
    const fetchTasks = async () => {
      const tasks = await fetchArchivedTasks();
      setArchivedTasks(tasks);
    };
    fetchTasks().catch(console.log);
  }, []);

  const deleteArchivedTask = (taskId: number) => {
    const newArchivedTasks = archivedTasks.filter((t) => {
      if (t.id === taskId) return;
      return t;
    });

    const thisTask = archivedTasks.find((t) => t.id === taskId);
    if (!thisTask) return;
    deleteArchivedTaskDB(taskId);
    setArchivedTasks(newArchivedTasks);
  };

  // Will update the due date
  const restoreArchivedTask = (originalTaskId: number, newTask: Task) => {
    saveTaskDB(newTask)
      .then(() => deleteArchivedTask(originalTaskId))
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between px-2 pd-2 pt-12">
      <Navbar currPage="ARCHIVE" />
      <div className="flex flex-col px-2 pt-2 w-full border-slate-700 bg-slate-900 rounded-lg border">
        {archivedTasks.map((t) => {
          const newTask = parseTaskString(t.originalText, 0);
          if (!newTask || !newTask.isValidTask())
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
                  onClick={() => restoreArchivedTask(t.id, newTask)}
                  className="hover:text-red-600 cursor-pointer inline"
                >
                  RESTORE
                </div>
              </section>
              <div className="mb-2 font-bold">{t.originalText}</div>
              <TaskComponent
                id={t.id}
                title={newTask.title}
                priority={newTask.priority}
                label={newTask.label}
                due={newTask.due}
                complete={false}
                toggleComplete={() => {}}
                overdue={false}
                daysTillDue={0}
                repeat={t?.repeat}
              />
            </div>
          );
        })}
        {archivedTasks.length === 0 && <p className="italic">Nothing here</p>}
      </div>
    </main>
  );
}

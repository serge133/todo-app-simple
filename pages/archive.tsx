import Navbar from "@/components/navbar";
import TaskComponent from "@/components/task-component";
import { fetchArchivedTasks, initializeDB } from "@/database";
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

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between px-2 pd-2 pt-10">
      <Navbar currPage="ARCHIVE" />
      <div className="flex flex-col p-2 w-full h-full border-slate-500 bg-black rounded-lg border overflow-hidden">
        <section className="grow overflow-y-auto">
          {archivedTasks.map((t) => (
            <TaskComponent
              key={t.id}
              id={t.id}
              title={t.title}
              priority={t.priority}
              label={t.label}
              due={t.due}
              complete={false}
              toggleComplete={() => {}}
              overdue={false}
            />
          ))}
          {archivedTasks.length === 0 && <p className="italic">Nothing here</p>}
        </section>
      </div>
    </main>
  );
}

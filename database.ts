import { openDB, deleteDB, wrap, unwrap } from "idb";
import Task from "@/models/task";

// INITIALIZES DATABASE FOR COMPUTER
export function initializeDB() {
  openDB("task-db", 1, {
    upgrade(db) {
      db.createObjectStore("task", { keyPath: "id" });
    },
  });
}

export async function updateTaskDB(task: Task) {
  const db1 = await openDB("task-db", 1);
  db1.put("task", task);
}

export async function fetchTasksDB(): Promise<Task[]> {
  const db1 = await openDB("task-db", 1);
  const tasks = await db1.getAll("task");
  db1.close();
  return tasks;
}

export async function saveTaskDB(newTask: Task) {
  const db1 = await openDB("task-db", 1);
  db1
    .add("task", newTask)
    .then((result) => console.log("Success!", result))
    .catch((err) => console.log("an error: ", err));
  //   db1
  //     .add("todo", true, "delivered")
  //     .then((result) => console.log("Success!", result))
  //     .catch((err) => console.log("an error: ", err));

  db1.close();
}

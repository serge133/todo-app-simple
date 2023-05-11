import {
  openDB,
  // deleteDB, wrap, unwrap, IDBPDatabase
} from "idb";
import Task from "@/models/task";

// INITIALIZES DATABASE FOR COMPUTER
export function initializeDB() {
  openDB("task-db", 1, {
    upgrade(db) {
      db.createObjectStore("task", { keyPath: "id" });
      db.createObjectStore("archived-task", { keyPath: "id" });
    },
  });
  // openDB("archive-db", 1, {
  //   upgrade(db) {
  //     db.createObjectStore("archived-task", { keyPath: "id" });
  //   },
  // });
}

export async function deleteTaskDB(taskID: number) {
  const db1 = await openDB("task-db", 1);
  db1.delete("task", taskID).then(console.log).catch(console.log);
  db1.close();
}
export async function updateTaskDB(task: Task) {
  const db1 = await openDB("task-db", 1);
  db1
    .put("task", task)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  db1.close();
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

  db1.close();
}

// Creates a new task in the archive that is it
export async function archiveTaskDB(newTask: Task) {
  const archiveDB = await openDB("task-db", 1);
  console.log("YO");
  archiveDB
    .put("archived-task", newTask)
    .then((result) => console.log("Success"))
    .catch((err) => console.log("Error: ", err));
  archiveDB.close();
}

export async function fetchArchivedTasks(): Promise<Task[]> {
  const db1 = await openDB("task-db", 1);
  const archivedTasks = await db1.getAll("archived-task");
  db1.close();
  return archivedTasks;
}

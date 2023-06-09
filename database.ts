import {
  openDB,
  // deleteDB, wrap, unwrap, IDBPDatabase
} from "idb";
import Task from "@/models/task";

const VERSION: number = 2;

// INITIALIZES DATABASE FOR COMPUTER
export function initializeDB() {
  openDB("task-db", VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("task")) {
        db.createObjectStore("task", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("archived-task")) {
        db.createObjectStore("archived-task", { keyPath: "id" });
      }
    },
  });
  // openDB("archive-db", 1, {
  //   upgrade(db) {
  //     db.createObjectStore("archived-task", { keyPath: "id" });
  //   },
  // });
}

export async function deleteTaskDB(taskID: number) {
  const db1 = await openDB("task-db", VERSION);
  db1.delete("task", taskID).catch((err) => console.log(err));
  db1.close();
}
export async function updateTaskDB(task: Task) {
  const db1 = await openDB("task-db", VERSION);
  db1.put("task", task).catch((err) => console.log(err));
  db1.close();
}

export async function fetchTasksDB(): Promise<Task[]> {
  const db1 = await openDB("task-db", VERSION);
  const tasks = await db1.getAll("task");
  db1.close();
  return tasks;
}

export async function saveTaskDB(newTask: Task) {
  const db1 = await openDB("task-db", VERSION);
  db1
    .add("task", newTask)
    .then((result) => console.log("Success!", result))
    .catch((err) => console.log("an error: ", err));

  db1.close();
}
// ARCHIVE
// Creates a new task in the archive that is it
export async function archiveTaskDB(newTask: Task) {
  const archiveDB = await openDB("task-db", VERSION);
  console.log("YO");
  archiveDB
    .put("archived-task", newTask)
    .then((result) => console.log("Success"))
    .catch((err) => console.log("Error: ", err));
  archiveDB.close();
}

export async function fetchArchivedTasks(): Promise<Task[]> {
  const db1 = await openDB("task-db", VERSION);
  const archivedTasks = await db1.getAll("archived-task");
  db1.close();
  return archivedTasks;
}

export async function deleteArchivedTaskDB(taskID: number) {
  const db1 = await openDB("task-db", VERSION);
  db1.delete("archived-task", taskID).then(console.log).catch(console.log);
  db1.close();
}

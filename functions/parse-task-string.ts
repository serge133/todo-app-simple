import Task from "@/models/task";

export default function parseTaskString(
  s: string,
  tasksLength: number
): Task | false {
  const actionMap = new Map([
    ["due", 0],
    ["priority", 0],
    ["pr", 0],
    ["label", 0],
    ["lb", 0],
  ] as const);
  const taskFieldList = s.trim().split(" ");
  const strippedFieldList: string[] = [];

  for (let i = 0; i < taskFieldList.length; i++) {
    const lowerCaseWord: string = taskFieldList[i].toLowerCase();
    // @ts-ignore
    if (!actionMap.has(lowerCaseWord)) {
      strippedFieldList.push(taskFieldList[i]);
      continue;
    }
    if (i === taskFieldList.length - 1) {
      // @ts-ignore
      actionMap.set(lowerCaseWord, "null");
      continue;
    }
    const action = taskFieldList[i + 1];
    // @ts-ignore
    actionMap.set(lowerCaseWord, action);
    i += 1;
  }

  const strippedField: string = strippedFieldList.join(" ").trim();

  if (!strippedField) {
    console.log("Field is empty");
    return false;
  }

  const newTask = new Task(
    strippedField,
    actionMap.get("priority") || actionMap.get("pr") || 0,
    actionMap.get("due") || 0,
    actionMap.get("label") || actionMap.get("lb") || 0,
    tasksLength,
    s
  );
  return newTask;
}

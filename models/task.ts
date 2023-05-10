import { future } from "@/util";

export default class Task {
  id: number;
  title: string;
  priority: number;
  due: string = "never";
  dueMS: number = -1;
  label: string;
  complete: boolean = false;
  order: number;
  originalText: string;

  private _valid: boolean = true;
  private _statusMsg: string = "";

  constructor(
    title: string,
    priority: number,
    due: string | 0,
    label: string | 0,
    order: number,
    originalText: string
  ) {
    this.id = +new Date();
    this.title = title;
    this.order = order;
    this.originalText = originalText;

    if (!isNaN(+priority)) {
      this.priority = Math.min(+priority, 3);
    } else {
      this._valid = false;
      this._statusMsg = "Something wrong with the priority";
      this.priority = 0;
    }

    this.parseDueDate(due);
    this.label = label ? label.toString() : "none";
  }

  private parseDueDate(due: string | 0) {
    if (due === 0) return;

    if (due[0] === "+") {
      if (isNaN(+due[1])) {
        this._valid = false;
        this._statusMsg = "Invalid dynamic date";
        return;
      }
      let num: number;
      let unit: string;

      // allows for +3days or +30days
      if (isNaN(+due[2])) {
        num = +due[1];
        unit = due.slice(2, due.length);
      } else {
        num = +due.slice(1, 3);
        unit = due.slice(3, due.length);
      }

      let temp: Date;
      switch (unit.trim().toLowerCase()) {
        case "w":
        case "week":
        case "weeks":
          temp = future(num, 0, 0, 0);
          this.dueMS = +temp;
          this.due = temp.toLocaleString();
          return;
        case "d":
        case "day":
        case "days":
          temp = future(0, num, 0, 0);
          this.dueMS = +temp;
          this.due = temp.toLocaleString();
          return;
        case "h":
        case "hour":
        case "hours":
          temp = future(0, 0, num, 0);
          this.dueMS = +temp;
          this.due = temp.toLocaleString();
          return;
        case "m":
        case "min":
        case "mins":
        case "minutes":
          temp = future(0, 0, 0, num);
          this.dueMS = +temp;
          this.due = temp.toLocaleString();
          return;
        default:
          this._valid = false;
          this._statusMsg = "Invalid dynamic date";
          return;
      }
    }
    let temp: Date, distance: number;

    const getFutureWeekday = (currday: number, futureday: number): number => {
      for (let i = 0; i < 7; i++) if ((currday + i) % 7 === futureday) return i;
      return -1;
    };

    switch (due.toLowerCase()) {
      case "now":
        temp = new Date();
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      case "tomorrow":
      case "tom":
        temp = future(0, 1, 0, 0);
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;

      case "tonight":
        temp = new Date(new Date().setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;

      case "mon":
      case "monday":
        distance = getFutureWeekday(new Date().getDay(), 1);
        temp = new Date(future(0, distance, 0, 0).setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      case "tue":
      case "tuesday":
        distance = getFutureWeekday(new Date().getDay(), 2);
        temp = new Date(future(0, distance, 0, 0).setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      case "wed":
      case "wednesday":
        distance = getFutureWeekday(new Date().getDay(), 3);
        temp = new Date(future(0, distance, 0, 0).setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      case "thu":
      case "thur":
      case "thursday":
        distance = getFutureWeekday(new Date().getDay(), 4);
        temp = new Date(future(0, distance, 0, 0).setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      case "fri":
      case "friday":
        distance = getFutureWeekday(new Date().getDay(), 5);
        temp = new Date(future(0, distance, 0, 0).setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      case "sat":
      case "saturday":
        distance = getFutureWeekday(new Date().getDay(), 6);
        temp = new Date(future(0, distance, 0, 0).setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      case "sun":
      case "sunday":
        distance = getFutureWeekday(new Date().getDay(), 0);
        temp = new Date(future(0, distance, 0, 0).setHours(23, 59, 59, 0));
        this.dueMS = +temp;
        this.due = temp.toLocaleString();
        break;
      // Happens when invalid date was supplied
      default:
        this._valid = false;
        this._statusMsg = "Invalid Date";
        this.due = due;
        return;
    }
  }

  isValidTask(): boolean {
    return this._valid;
  }

  getStatusMsg(): string {
    return this._statusMsg;
  }

  toggleComplete(): void {
    this.complete = !this.complete;
  }
}

export const parseTaskString = (
  s: string,
  tasksLength: number
): Task | false => {
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
    const word: string = taskFieldList[i].toLowerCase();
    // @ts-ignore
    if (!actionMap.has(word)) {
      strippedFieldList.push(word);
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
};

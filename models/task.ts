import { future } from "@/util";

export default class Task {
  id: number;
  title: string;
  priority: number;
  due: string | Date = "never";
  label: string;
  complete: boolean = false;
  order: number;

  private _valid: boolean = true;
  private _statusMsg: string = "";

  constructor(
    title: string,
    priority: number,
    due: string | 0,
    label: string | 0,
    order: number
  ) {
    this.id = +new Date();
    this.title = title;
    this.order = order;

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

      switch (unit) {
        case "w":
        case "week":
        case "weeks":
          this.due = future(num, 0, 0, 0);
          return;
        case "d":
        case "day":
        case "days":
          this.due = future(0, num, 0, 0);
          return;
        case "h":
        case "hour":
        case "hours":
          this.due = future(0, 0, num, 0);
          return;
        case "m":
        case "min":
        case "mins":
        case "minutes":
          this.due = future(0, 0, 0, num);
          return;
        default:
          this._valid = false;
          this._statusMsg = "Invalid dynamic date";
          return;
      }
    }
    switch (due) {
      case "now":
        this.due = new Date();
        break;
      case "tomorrow":
      case "tom":
        this.due = future(0, 1, 0, 0);
        break;

      case "tonight":
        this.due = new Date(new Date().setHours(23, 59, 0, 0));
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

import { calcDaysTillDue, future } from "@/functions/util";

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
  daysTillDue: number = -1;
  repeat: boolean;
  hasDueDate: boolean = false;

  private _valid: boolean = true;
  private _statusMsg: string = "";

  constructor(
    title: string,
    priority: number,
    due: string | 0,
    label: string | 0,
    order: number,
    originalText: string,
    repeat: boolean
  ) {
    this.id = +new Date();
    this.title = title;
    this.order = order;
    this.originalText = originalText;
    this.repeat = repeat;

    if (!isNaN(+priority)) {
      this.priority = Math.min(+priority, 3);
    } else {
      this._valid = false;
      this._statusMsg = "Something wrong with the priority";
      this.priority = 0;
    }

    this.parseDueDate(due);
    if (this.hasDueDate) {
      this.daysTillDue = calcDaysTillDue(this.dueMS);
    }
    this.label = label ? label.toString() : "none";
  }

  private parseDueDate(due: string | 0) {
    // Default if user did not specify a due date, then it is 0
    if (due === 0) {
      this.hasDueDate = false;
      this.dueMS = Infinity;
      this.due = "none";
      this.daysTillDue = -1;
      return;
    }
    this.hasDueDate = true;

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
}

import { future } from "@/util";

export default class Task {
  id: number;
  title: string;
  priority: number;
  due: string | Date;
  label: string;
  complete: boolean = false;

  private _valid: boolean = true;
  private _statusMsg: string = "";

  constructor(
    title: string = "Unnamed",
    priority: number = 0,
    due: string | 0,
    label: string | 0
  ) {
    this.id = +new Date();
    this.title = title;

    if (!isNaN(+priority)) {
      this.priority = Math.min(+priority, 3);
    } else {
      this._valid = false;
      this._statusMsg = "Something wrong with the priority";
      this.priority = 0;
    }

    switch (due) {
      case "now":
        this.due = new Date();
        break;
      case "tomorrow":
      case "tom":
        this.due = future(1);
        break;
      case 0:
        this.due = "never";
        break;
      default:
        this._valid = false;
        this._statusMsg = "Invalid Date";
        this.due = due;
    }

    this.label = label ? label.toString() : "none";
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

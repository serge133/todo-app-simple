import Navbar from "@/components/navbar";
import TaskComponent from "@/components/task-component";
// import Image from "next/image";
// import baseTaskFieldPNG from "@/assets/base-task-field.png";
import TaskField from "@/components/task-field";

export default function HowToUsePage() {
  const Seperator = ({ children }: { children: string }) => (
    <div className="pt-5 mb-2">
      <h1 className="text-xl mb-2 text-purple-300">{children}</h1>
      <hr />
    </div>
  );
  return (
    <main className="h-screen w-screen">
      <Navbar currPage="HOW TO USE" />
      <div className="w-full pt-12 p-2">
        <div className="bg-slate-900 grow w-full rounded-lg p-2">
          <Seperator>Task Creation</Seperator>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="My First Task"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">
            Typing a task and pressing enter creates a task like the one below:
          </p>
          <TaskComponent
            id={0}
            priority={0}
            label="none"
            due="none"
            title="My First Task"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={Infinity}
            hasDueDate={false}
          />
          <p className="text-slate-400 my-2">
            This is boring however, and can be done by writing on a piece of
            paper, so let us start doing some cool shit.
          </p>
          <Seperator>Task Creation with Due Date</Seperator>
          <p className="text-slate-400 my-2">
            You want a task due this wednesday, just type{" "}
            <span className="text-red-500">due wed</span> or{" "}
            <span className="text-red-500">DUE Wednesday</span> anywhere you
            want in the field.
          </p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="My Second Task due wed"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">or</p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="DUE WEDNESDAY My Second Task"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">or</p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="due wed My Second Task"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">
            Press Enter and you will see that this task is now due the next
            wednesday. There are many ways to specify a due date. You can have
            due WEEKDAY, or you can say due tomorrow, or you can type due now.
          </p>
          <TaskComponent
            id={0}
            priority={0}
            label="none"
            due="5/17/2023, 11:59:59 PM"
            title="My Second Task"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={6}
            hasDueDate
          />
          <p className="text-slate-400 my-2">
            A quick note that if you submit a task without a due date it will
            automatically assume that it is due tonight. The due dates change
            color based on how many days are left until the task is due. If
            there is less than one day left the color of the due tag will be
            red. If two then amber, if three then green. After three it is just
            white.
          </p>

          <TaskComponent
            id={0}
            priority={0}
            label="none"
            due="5/13/2023, 11:59:59 PM"
            title="This is due in less than one day"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={1}
            hasDueDate
          />
          <TaskComponent
            id={0}
            priority={0}
            label="none"
            due="5/14/2023, 11:59:59 PM"
            title="This is due in less than two days "
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={2}
            hasDueDate
          />
          <TaskComponent
            id={0}
            priority={0}
            label="none"
            due="5/15/2023, 11:59:59 PM"
            title="This is due in less than three days"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={3}
            hasDueDate
          />
          <Seperator>Dynamic Due Dates</Seperator>
          <p className="text-slate-400 my-2">
            You can also have your task due two hours from now: due +2h/due
            +2hour/due +2hours. Or you can have a task due one week from now:
            due +1w. There are a lot of ways to create a due date: <br />
            - due +3m / due +3min / due +3minutes | Due three minutes from now
            <br />
            - due +3h / due +3hour / due +3hours | Due three hours from now
            <br />
            - due +20d / due +20day / due +20days | Due 20 days from now
            <br />
            - due +2w / due +2week / due +2weeks | Due 2 weeks from now
            <br />
          </p>
          <Seperator>Task Creation with Label</Seperator>
          <p className="text-slate-400 my-2">
            Let us attach a label to a task, this is good if you want to filter
            out yours tasks by their labels in order to be more focused. Let us
            say you need to do math homework for your linear algebra class.
            There are two groups that this homework belongs to, it is school,
            then within school it is linear algebra which we will abbreviate to
            linalg. Just type:{" "}
            <span className="text-red-500">lb school/linalg</span> or{" "}
            <span className="text-red-500">label school/linalg</span> anywhere
            you want in the field.
          </p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="Math homework lb school/linalg"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">or</p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="Math homework label school/linalg"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">or</p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="lb school/linalg Math homework"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">
            Press Enter and you will see that this task now has a label:
          </p>
          <TaskComponent
            id={0}
            priority={0}
            label="school/linalg"
            due="none"
            title="Math homework"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={Infinity}
            hasDueDate={false}
          />
          <Seperator>Repeating Task</Seperator>
          <p className="text-slate-400 my-2">
            Instead of restoring a task constantly from the archive, you can
            automate this. When a task is a habit that must be due everyday you
            can attach the repeat flag to the task. Repeat allows you to
            reinitialize a task automatically everytime once it is completed and
            is past due, without the repeat flag the task will go to the
            archive. Just add the word{" "}
            <span className="text-red-500">repeat</span> anywhere in the field.
          </p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="Go running repeat"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">or</p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="repeat Go running"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">
            Press Enter, and this will become a repeating task:
          </p>
          <TaskComponent
            id={0}
            priority={0}
            label="none"
            due="none"
            title="Go running"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={Infinity}
            repeat={true}
            hasDueDate={false}
          />
          <Seperator>Task Creation with Priority</Seperator>
          <p className="text-slate-400 my-2">
            Let us attach a priority to a task, priorities are good to see which
            tasks need to be completed first or are more important. There are 4
            priorities: 0, 1, 2, and 3. By default all tasks are assigned a 0
            priority. The higher the number the higher the priority. Tasks that
            are green are low priority, orange is medium priority, red is high
            priority. When priority is 0 (default) then the task is not colored.
            To assign a high priority type:
            <span className="text-red-500">pr 3</span> or{" "}
            <span className="text-red-500">priority 3</span> anywhere you want
            in the field.
          </p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="SUPER IMPORTANT TASK PR 3"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">or</p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="PRIORITY 3 SUPER IMPORTANT TASK"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">or</p>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="PR 3 SUPER IMPORTANT TASK"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">
            Press Enter and you will see that this task now has a high priority:
          </p>
          <TaskComponent
            id={0}
            priority={3}
            label="none"
            due="none"
            title="SUPER IMPORTANT TASK"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={Infinity}
            hasDueDate={false}
          />
          <Seperator>Combine all three</Seperator>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value="Go workout due +3hours pr 1 label health"
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400 my-2">Press Enter</p>
          <TaskComponent
            id={0}
            priority={1}
            label="health"
            due="5/11/2023, 7:01:32 PM"
            title="Go workout"
            toggleComplete={() => {}}
            overdue={false}
            complete={false}
            daysTillDue={1}
            hasDueDate
          />
          <Seperator>Archiving</Seperator>
          <p className="text-slate-400 my-2">
            If a task is past its due date and it is completed, then the task
            will be automatically archived so that the home page is not
            cluttered with completed tasks. If the task is not completed then it
            will forever stay on your home page. If the task is completed but it
            has not past its due date yet, then it will still be accessible from
            the home page (click show complete to see it). From the archive you
            can either restore a task, which will regenerate the same task with
            an updated due date or delete it permanently.
          </p>
          <Seperator>Overdue tasks</Seperator>
          <p className="text-slate-400 my-2">
            Overdue tasks that are not completed will have an{" "}
            <span className="text-red-500">(Overdue)</span> badge next to the
            due date to remind you that it is past its due date.
          </p>
          <TaskComponent
            id={0}
            priority={1}
            label="habit"
            due="5/11/2023, 3:01:32 PM"
            title="I task I have been procrastinating"
            toggleComplete={() => {}}
            overdue={true}
            complete={false}
            daysTillDue={0}
            hasDueDate
          />
        </div>
      </div>
    </main>
  );
}

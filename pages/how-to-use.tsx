import Navbar from "@/components/navbar";
// import Image from "next/image";
// import baseTaskFieldPNG from "@/assets/base-task-field.png";
import TaskField from "@/components/task-field";

export default function HowToUsePage() {
  const Seperator = ({ children }: { children: string }) => (
    <div className="pt-5 mb-2">
      <h1 className="text-xl mb-2 text-slate-300">{children}</h1>
      <hr />
    </div>
  );
  return (
    <main className="h-screen w-screen">
      <Navbar currPage="HOW TO USE" />
      <div className="w-full h-full pt-10 p-2">
        <div className="shaded bg-slate-900 grow w-full h-full rounded-lg px-5">
          <Seperator>Task Creation</Seperator>
          <TaskField
            className="w-full"
            setValue={() => {}}
            value=""
            onEnter={() => {}}
            placeholder="Workout due +4days priority 3 label sports"
          />
          <p className="text-slate-400">
            Typing a task and pressing enter creates a task like the one below
          </p>
        </div>
      </div>
    </main>
  );
}

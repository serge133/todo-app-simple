import { ChangeEvent, ReactNode } from "react";

type Props = {
  onChangeLabel: (label: string) => void;
  labelFilterVal: string;
  hideComplete: boolean;
  setHideComplete: (val: boolean) => void;
  sortBy: "custom" | "duedate";
  setSortByFilter: (val: "custom" | "duedate") => void;
};

export default function ListController(props: Props) {
  const toggleShowComplete = () => props.setHideComplete(!props.hideComplete);
  const toggleFilter = () => {
    if (props.sortBy === "custom") props.setSortByFilter("duedate");
    else props.setSortByFilter("custom");
  };

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeLabel(e.target.value);
  };

  return (
    <section className="rounded-lg border px-5 focus:outline-none mt-2 flex flex-row justify-start items-center gap-5">
      <div
        onClick={toggleShowComplete}
        className="cursor-pointer rounded-lg py-2 text-sm text-white underline underline-offset-4 hover:text-red-500"
      >
        {props.hideComplete ? "Show Complete" : "Hide Complete"}
      </div>
      {/* <div className="flex flex-row gap-2 w-32 text-red-500 px-3 py-2 rounded-lg text-sm font-bold">
        <p className="">Label: </p>{" "}
      </div> */}
      <div
        onClick={toggleFilter}
        className="cursor-pointer rounded-lg py-2 text-sm text-white hover:text-red-500 underline-offset-4 underline"
      >
        {props.sortBy === "custom" ? "By Due Date" : "Custom Sorting"}
      </div>
      {/* {props.sortBy !== "custom" && (
        <p className=" text-xs italic text-gray-800">
          *Up Down Movement Disabled
        </p>
      )} */}
      <input
        onChange={handleLabelChange}
        value={props.labelFilterVal}
        className="bg-transparent text-red-500 w-14 text-sm underline underline-offset-4 outline-none text-center "
        placeholder="label"
      />
    </section>
  );
}

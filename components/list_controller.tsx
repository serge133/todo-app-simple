import { ChangeEvent } from "react";

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
    <section className="rounded-lg bg-inherit border px-5 py-2.5 focus:outline-none mt-2 flex flex-row justify-start items-center gap-2">
      <div
        onClick={toggleShowComplete}
        className="cursor-pointer font-bold rounded-lg px-3 py-2 text-sm bg-red-500 hover:bg-red-600"
      >
        {props.hideComplete ? "Show Complete" : "Hide Complete"}
      </div>
      <div className="flex flex-row gap-2 w-32 bg-red-500 px-3 py-2 rounded-lg text-sm font-bold">
        <p className="">Label: </p>{" "}
        <input
          onChange={handleLabelChange}
          value={props.labelFilterVal}
          className=" bg-transparent placeholder:text-white text-white grow w-full border-b outline-none text-center"
          placeholder="Any"
        />
      </div>
      <div
        onClick={toggleFilter}
        className="cursor-pointer font-bold rounded-lg px-3 py-2 text-sm bg-red-500 hover:bg-red-600"
      >
        Sort By: {props.sortBy === "custom" ? "Custom" : "Due Date"}
      </div>
    </section>
  );
}

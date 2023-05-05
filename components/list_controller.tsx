type Props = {
  onChangeLabel: (label: string) => void;
  labelFilterVal: string;
  hideComplete: boolean;
  setHideComplete: (val: boolean) => void;
};

export default function ListController(props: Props) {
  const toggleShowComplete = () => props.setHideComplete(!props.hideComplete);
  return (
    <section className="rounded-lg bg-inherit border px-5 py-2.5 focus:outline-none mt-2 flex flex-row justify-start items-center gap-2">
      <div
        onClick={toggleShowComplete}
        className={`cursor-pointer rounded-lg px-3 py-2 text-xs ${
          props.hideComplete ? "bg-red-500 " : ""
        }`}
      >
        Hide Complete
      </div>
      <div className="flex flex-row gap-2 w-28">
        <p>Label: </p>{" "}
        <input
          onChange={(e) => props.onChangeLabel(e.target.value)}
          value={props.labelFilterVal}
          className="bg-black grow w-full border-b outline-none text-center"
          placeholder="Any"
        />
      </div>
    </section>
  );
}

import Link from "next/link";
type Props = {
  currPage: string;
  numTasks?: number;
};

export default function Navbar(props: Props) {
  const items = [
    { name: "HOME", url: "/" },
    { name: "ARCHIVE", url: "/archive" },
    { name: "DEMO", url: "/demo" },
  ];

  return (
    <div className="absolute top-0 left-0 w-full py-2">
      {items.map((l) => (
        <div key={l.name} className="ml-5 inline">
          <Link
            className={[
              "hover:text-red-500",
              l.name === props.currPage ? "text-red-500" : "",
            ].join(" ")}
            href={l.url}
          >
            {l.name}
          </Link>
        </div>
      ))}
      {props.numTasks ? (
        <h3 className="italic inline ml-5">
          <span className="text-red-500">{props.numTasks}</span> task(s) due
        </h3>
      ) : (
        <h3 className="italic inline ml-5">No Tasks</h3>
      )}
    </div>
  );
}

export default function CheckBox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick: () => void;
}) {
  const checkedClassname = "bg-red-500";
  return (
    <div
      onClick={onClick}
      className={[
        "rounded-full border-2 w-6 h-6 cursor-pointer hover:border-red-500",
        checked ? checkedClassname : "",
      ].join(" ")}
    />
  );
}

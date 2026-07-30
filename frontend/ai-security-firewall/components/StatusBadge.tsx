type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const normalizedStatus = status.toLowerCase();

  let color = "bg-gray-600";

  if (normalizedStatus === "safe") {
    color = "bg-green-600";
  } else if (normalizedStatus === "warning") {
    color = "bg-yellow-500";
  } else if (
    normalizedStatus === "malicious" ||
    normalizedStatus === "danger"
  ) {
    color = "bg-red-600";
  }

  return (
    <span
      className={`${color} rounded-full px-3 py-1 text-sm font-semibold text-white`}
    >
      {status}
    </span>
  );
}
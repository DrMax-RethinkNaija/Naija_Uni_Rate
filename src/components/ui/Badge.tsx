interface BadgeProps {
  status: "reviewed" | "unreviewed";
}

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
        status === "reviewed"
          ? "bg-naija-green/20 text-naija-green-light border border-naija-green/30"
          : "bg-dark-700 text-gray-400 border border-dark-600"
      }`}
    >
      {status === "reviewed" ? "Verified" : "Unverified"}
    </span>
  );
}

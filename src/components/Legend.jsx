const legendItems = [
  { label: "Available", className: "bg-green-500" },
  { label: "Occupied", className: "bg-red-500" },
  { label: "Newly booked", className: "bg-blue-500" },
];

export default function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${item.className}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

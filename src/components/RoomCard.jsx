export default function RoomCard({ room }) {
  const statusClasses = room.selected
    ? "border-blue-500 bg-blue-500 text-white shadow-blue-200"
    : room.occupied
      ? "border-red-500 bg-red-500 text-white shadow-red-200"
      : "border-green-500 bg-green-50 text-green-800 shadow-green-100 hover:bg-green-100";

  const statusLabel = room.selected
    ? "Newly booked"
    : room.occupied
      ? "Occupied"
      : "Available";

  return (
    <div
      aria-label={`Room ${room.id}, ${statusLabel}`}
      title={`Room ${room.id} - ${statusLabel}`}
      className={`flex aspect-square min-h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-sm font-bold shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-14 ${statusClasses}`}
    >
      {room.id}
    </div>
  );
}

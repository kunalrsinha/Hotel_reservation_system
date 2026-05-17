import { MAX_ROOMS_PER_BOOKING } from "../constants/hotelConfig";

export default function Controls({
  roomCount,
  onRoomCountChange,
  onBook,
  onReset,
  onRandomOccupancy,
  availableRoomsCount,
  error,
}) {
  const parsedRoomCount = Number(roomCount);
  const isBookDisabled =
    !Number.isInteger(parsedRoomCount) ||
    parsedRoomCount < 1 ||
    parsedRoomCount > MAX_ROOMS_PER_BOOKING ||
    availableRoomsCount === 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Booking Controls
        </p>
        <h2 className="text-2xl font-bold text-slate-950">Reserve rooms</h2>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Number of rooms
          </span>
          <input
            type="number"
            min="1"
            max={MAX_ROOMS_PER_BOOKING}
            value={roomCount}
            onChange={(event) => onRoomCountChange(event.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          <span className="mt-2 block text-xs text-slate-500">
            Maximum {MAX_ROOMS_PER_BOOKING} rooms per booking.
          </span>
        </label>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-3 min-[420px]:grid-cols-3">
          <button
            type="button"
            onClick={onBook}
            disabled={isBookDisabled}
            className="min-h-12 rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold leading-tight text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            Book Rooms
          </button>
          <button
            type="button"
            onClick={onRandomOccupancy}
            className="min-h-12 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold leading-tight text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
          >
            Random Occupancy
          </button>
          <button
            type="button"
            onClick={onReset}
            className="min-h-12 rounded-xl border border-slate-300 bg-slate-950 px-3 py-2 text-sm font-bold leading-tight text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Reset Booking
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-green-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
              Available
            </p>
            <p className="mt-1 text-2xl font-bold text-green-900">
              {availableRoomsCount}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Capacity
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-950">97</p>
          </div>
        </div>
      </div>
    </section>
  );
}

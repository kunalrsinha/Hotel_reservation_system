export default function BookingSummary({ summary }) {
  const hasBooking = summary.rooms.length > 0;
  const bookingTypeLabel =
    summary.bookingType === "Same-floor booking"
      ? "Same Floor"
      : summary.bookingType === "Multi-floor booking"
        ? "Multi Floor"
        : "No active booking";
  const bookedRoomsLabel = hasBooking
    ? summary.rooms.map((room) => room.id).join(", ")
    : "-";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Booking Summary
        </p>
        <h2 className="text-2xl font-bold text-slate-950">
          {bookingTypeLabel}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Rooms booked
          </p>
          <p className="mt-2 text-lg font-bold text-slate-950">
            {bookedRoomsLabel}
          </p>
        </div>

        <div className="grid gap-3 min-[360px]:grid-cols-2">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Travel time
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-950">
              {summary.travelTime}
              <span className="ml-1 text-sm font-semibold">min</span>
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total booked
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-950">
              {summary.rooms.length}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Booking type
          </p>
          <p className="mt-1 text-base font-bold text-slate-950">
            {bookingTypeLabel}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-600">
          The allocator first searches compact same-floor windows. If that is not
          possible, it scans the globally sorted free rooms and minimizes vertical
          plus horizontal travel time with deterministic lower-room tie breaks.
        </div>
      </div>
    </section>
  );
}

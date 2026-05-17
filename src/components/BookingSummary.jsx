export default function BookingSummary({ summary }) {
  const hasBooking = summary.rooms.length > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Booking Summary
        </p>
        <h2 className="text-2xl font-bold text-slate-950">
          {hasBooking ? summary.bookingType : "No active booking"}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Rooms booked
          </p>
          <p className="mt-2 text-lg font-bold text-slate-950">
            {hasBooking ? summary.rooms.map((room) => room.id).join(", ") : "-"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-blue-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              Travel time
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-950">
              {summary.travelTime}
              <span className="ml-1 text-sm font-semibold">min</span>
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Count
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-950">
              {summary.rooms.length}
            </p>
          </div>
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

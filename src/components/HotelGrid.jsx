import RoomCard from "./RoomCard";
import { HOTEL_FLOORS } from "../constants/hotelConfig";

export default function HotelGrid({ rooms }) {
  const roomsByFloor = HOTEL_FLOORS.map(({ floor }) => ({
    floor,
    rooms: rooms
      .filter((room) => room.floor === floor)
      .sort((roomA, roomB) => roomA.position - roomB.position),
  })).reverse();

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-200/70 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Hotel Layout
          </p>
          <h2 className="text-2xl font-bold text-slate-950">97-room tower</h2>
        </div>
        <p className="text-sm text-slate-500">Floors render from top to bottom.</p>
      </div>

      <div className="space-y-3">
        {roomsByFloor.map(({ floor, rooms: floorRooms }) => (
          <div
            key={floor}
            className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all duration-300 hover:border-slate-200 hover:bg-white hover:shadow-sm md:grid-cols-[5rem_5.75rem_1fr] md:items-center"
          >
            <div className="flex items-center justify-between md:block">
              <span className="text-sm font-bold text-slate-700">
                Floor {floor}
              </span>
              <span className="text-xs font-medium text-slate-400 md:mt-1 md:block">
                {floorRooms.length} rooms
              </span>
            </div>

            <div className="flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-[0.68rem] font-black uppercase leading-tight tracking-wide text-slate-500 shadow-sm md:min-h-14">
              Stairs / Lift
            </div>

            <div className="flex flex-wrap gap-2">
              {floorRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

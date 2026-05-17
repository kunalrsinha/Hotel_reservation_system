"use client";

import { useCallback, useMemo, useState } from "react";
import BookingSummary from "../components/BookingSummary";
import Controls from "../components/Controls";
import HotelGrid from "../components/HotelGrid";
import Legend from "../components/Legend";
import { MAX_ROOMS_PER_BOOKING } from "../constants/hotelConfig";
import { findOptimalRooms } from "../utils/bookingAlgorithm";
import { generateRandomOccupancy, generateRooms } from "../utils/generateRooms";

const emptySummary = {
  rooms: [],
  travelTime: 0,
  bookingType: "No booking",
};

function markBookedRooms(rooms, bookedRooms) {
  const bookedRoomIds = new Set(bookedRooms.map((room) => room.id));

  return rooms.map((room) => ({
    ...room,
    occupied: room.occupied || bookedRoomIds.has(room.id),
    selected: bookedRoomIds.has(room.id),
  }));
}

function clearSelections(rooms) {
  return rooms.map((room) => ({
    ...room,
    selected: false,
  }));
}

export default function Home() {
  const [rooms, setRooms] = useState(() => generateRooms());
  const [roomCount, setRoomCount] = useState("1");
  const [summary, setSummary] = useState(emptySummary);
  const [error, setError] = useState("");

  const availableRoomsCount = useMemo(
    () => rooms.filter((room) => !room.occupied).length,
    [rooms],
  );

  const handleRoomCountChange = useCallback((value) => {
    setRoomCount(value);
    setError("");
  }, []);

  const handleBook = useCallback(() => {
    const requestedCount = Number(roomCount);

    if (
      !Number.isInteger(requestedCount) ||
      requestedCount < 1 ||
      requestedCount > MAX_ROOMS_PER_BOOKING
    ) {
      setError(`Enter a room count between 1 and ${MAX_ROOMS_PER_BOOKING}.`);
      return;
    }

    const availableCount = rooms.filter((room) => !room.occupied).length;

    if (availableCount < requestedCount) {
      setError(`Only ${availableCount} room(s) are available.`);
      return;
    }

    const result = findOptimalRooms(rooms, requestedCount);

    if (!result) {
      setError("No rooms available for the requested booking.");
      setSummary(emptySummary);
      return;
    }

    setRooms((currentRooms) => markBookedRooms(clearSelections(currentRooms), result.rooms));
    setSummary(result);
    setError("");
  }, [roomCount, rooms]);

  const handleReset = useCallback(() => {
    setRooms(generateRooms());
    setSummary(emptySummary);
    setError("");
    setRoomCount("1");
  }, []);

  const handleRandomOccupancy = useCallback(() => {
    setRooms((currentRooms) => generateRandomOccupancy(clearSelections(currentRooms)));
    setSummary(emptySummary);
    setError("");
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {/* <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                Optimized Reservation Engine
              </p> */}
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Hotel Room Reservation System
              </h1>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                Book up to five rooms with same-floor priority and deterministic
                travel-time minimization across fragmented availability.
              </p>
            </div>
            <Legend />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[22rem_1fr] lg:px-8">
        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <Controls
            roomCount={roomCount}
            onRoomCountChange={handleRoomCountChange}
            onBook={handleBook}
            onReset={handleReset}
            onRandomOccupancy={handleRandomOccupancy}
            availableRoomsCount={availableRoomsCount}
            error={error}
          />
          <BookingSummary summary={summary} />
        </aside>

        <HotelGrid rooms={rooms} />
      </div>
    </main>
  );
}

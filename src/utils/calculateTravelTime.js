import {
  HORIZONTAL_TRAVEL_MINUTES_PER_ROOM,
  VERTICAL_TRAVEL_MINUTES_PER_FLOOR,
} from "../constants/hotelConfig";

export function calculateTravelTime(rooms) {
  if (!rooms.length) {
    return 0;
  }

  const floors = rooms.map((room) => room.floor);
  const positions = rooms.map((room) => room.position);
  const verticalDistance =
    (Math.max(...floors) - Math.min(...floors)) *
    VERTICAL_TRAVEL_MINUTES_PER_FLOOR;
  const horizontalDistance =
    (Math.max(...positions) - Math.min(...positions)) *
    HORIZONTAL_TRAVEL_MINUTES_PER_ROOM;

  return verticalDistance + horizontalDistance;
}

export function getBookingType(rooms) {
  if (!rooms.length) {
    return "No booking";
  }

  const firstFloor = rooms[0].floor;
  return rooms.every((room) => room.floor === firstFloor)
    ? "Same-floor booking"
    : "Multi-floor booking";
}

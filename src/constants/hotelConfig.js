export const MAX_ROOMS_PER_BOOKING = 5;
export const RANDOM_OCCUPANCY_MIN = 0.3;
export const RANDOM_OCCUPANCY_MAX = 0.4;
export const VERTICAL_TRAVEL_MINUTES_PER_FLOOR = 2;
export const HORIZONTAL_TRAVEL_MINUTES_PER_ROOM = 1;

export const HOTEL_FLOORS = [
  { floor: 1, roomCount: 10 },
  { floor: 2, roomCount: 10 },
  { floor: 3, roomCount: 10 },
  { floor: 4, roomCount: 10 },
  { floor: 5, roomCount: 10 },
  { floor: 6, roomCount: 10 },
  { floor: 7, roomCount: 10 },
  { floor: 8, roomCount: 10 },
  { floor: 9, roomCount: 10 },
  { floor: 10, roomCount: 7 },
];

export const TOTAL_ROOMS = HOTEL_FLOORS.reduce(
  (total, floor) => total + floor.roomCount,
  0,
);

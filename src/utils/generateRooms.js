import {
  HOTEL_FLOORS,
  RANDOM_OCCUPANCY_MAX,
  RANDOM_OCCUPANCY_MIN,
  TOTAL_ROOMS,
} from "../constants/hotelConfig";

export function generateRooms() {
  return HOTEL_FLOORS.flatMap(({ floor, roomCount }) =>
    Array.from({ length: roomCount }, (_, index) => {
      const position = index + 1;

      return {
        id: floor === 10 ? 1000 + position : floor * 100 + position,
        floor,
        position,
        occupied: false,
        selected: false,
      };
    }),
  );
}

export function generateRandomOccupancy(rooms) {
  const occupancyRate =
    RANDOM_OCCUPANCY_MIN +
    Math.random() * (RANDOM_OCCUPANCY_MAX - RANDOM_OCCUPANCY_MIN);
  const targetOccupiedCount = Math.round(TOTAL_ROOMS * occupancyRate);
  const shuffledIds = rooms
    .map((room) => room.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, targetOccupiedCount);
  const occupiedRoomIds = new Set(shuffledIds);

  return rooms.map((room) => ({
    ...room,
    occupied: occupiedRoomIds.has(room.id),
    selected: false,
  }));
}

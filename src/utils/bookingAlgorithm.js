import { HOTEL_FLOORS } from "../constants/hotelConfig";
import { calculateTravelTime } from "./calculateTravelTime";

function sortByFloorAndPosition(roomA, roomB) {
  return roomA.floor - roomB.floor || roomA.position - roomB.position;
}

function compareCandidates(candidate, currentBest) {
  if (!currentBest) {
    return candidate;
  }

  if (candidate.travelTime !== currentBest.travelTime) {
    return candidate.travelTime < currentBest.travelTime ? candidate : currentBest;
  }

  const candidateFirstRoom = candidate.rooms[0];
  const bestFirstRoom = currentBest.rooms[0];

  if (candidateFirstRoom.floor !== bestFirstRoom.floor) {
    return candidateFirstRoom.floor < bestFirstRoom.floor ? candidate : currentBest;
  }

  return candidateFirstRoom.position < bestFirstRoom.position
    ? candidate
    : currentBest;
}

function findBestWindow(sortedRooms, requestedCount) {
  let bestCandidate = null;

  for (let start = 0; start <= sortedRooms.length - requestedCount; start += 1) {
    const rooms = sortedRooms.slice(start, start + requestedCount);
    const candidate = {
      rooms,
      travelTime: calculateTravelTime(rooms),
    };

    bestCandidate = compareCandidates(candidate, bestCandidate);
  }

  return bestCandidate;
}

function findSameFloorAllocation(rooms, requestedCount) {
  return HOTEL_FLOORS.reduce((bestCandidate, { floor }) => {
    const freeRoomsOnFloor = rooms
      .filter((room) => room.floor === floor && !room.occupied)
      .sort(sortByFloorAndPosition);

    if (freeRoomsOnFloor.length < requestedCount) {
      return bestCandidate;
    }

    const floorCandidate = findBestWindow(freeRoomsOnFloor, requestedCount);
    return compareCandidates(floorCandidate, bestCandidate);
  }, null);
}

function findMultiFloorAllocation(rooms, requestedCount) {
  const freeRooms = rooms
    .filter((room) => !room.occupied)
    .sort(sortByFloorAndPosition);

  if (freeRooms.length < requestedCount) {
    return null;
  }

  return findBestWindow(freeRooms, requestedCount);
}

export function findOptimalRooms(rooms, requestedCount) {
  const sameFloorCandidate = findSameFloorAllocation(rooms, requestedCount);

  if (sameFloorCandidate) {
    return {
      ...sameFloorCandidate,
      bookingType: "Same-floor booking",
    };
  }

  const multiFloorCandidate = findMultiFloorAllocation(rooms, requestedCount);

  if (!multiFloorCandidate) {
    return null;
  }

  return {
    ...multiFloorCandidate,
    bookingType: "Multi-floor booking",
  };
}

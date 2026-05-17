import { TOTAL_ROOMS } from "../constants/hotelConfig";

export const RESERVATION_STORAGE_KEY = "hotel-reservation-state";
export const STORAGE_EXPIRY_MS = 4 * 60 * 60 * 1000;

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isValidRoom(room) {
  return (
    room &&
    Number.isInteger(room.id) &&
    Number.isInteger(room.floor) &&
    Number.isInteger(room.position) &&
    typeof room.occupied === "boolean" &&
    typeof room.selected === "boolean"
  );
}

function isValidBookingSummary(summary) {
  return (
    summary &&
    Array.isArray(summary.rooms) &&
    summary.rooms.every(isValidRoom) &&
    Number.isFinite(summary.travelTime) &&
    typeof summary.bookingType === "string"
  );
}

function isValidStoredReservationState(state) {
  return (
    state &&
    Array.isArray(state.rooms) &&
    state.rooms.length === TOTAL_ROOMS &&
    state.rooms.every(isValidRoom) &&
    isValidBookingSummary(state.bookingSummary) &&
    Number.isFinite(state.expiry)
  );
}

export function loadReservationState() {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    const rawState = window.localStorage.getItem(RESERVATION_STORAGE_KEY);

    if (!rawState) {
      return null;
    }

    const parsedState = JSON.parse(rawState);

    if (!isValidStoredReservationState(parsedState)) {
      window.localStorage.removeItem(RESERVATION_STORAGE_KEY);
      return null;
    }

    if (Date.now() > parsedState.expiry) {
      window.localStorage.removeItem(RESERVATION_STORAGE_KEY);
      return null;
    }

    return {
      rooms: parsedState.rooms,
      bookingSummary: parsedState.bookingSummary,
    };
  } catch {
    window.localStorage.removeItem(RESERVATION_STORAGE_KEY);
    return null;
  }
}

export function saveReservationState({ rooms, bookingSummary }) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    const state = {
      rooms,
      bookingSummary,
      expiry: Date.now() + STORAGE_EXPIRY_MS,
    };

    window.localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(state));
  } catch {
    window.localStorage.removeItem(RESERVATION_STORAGE_KEY);
  }
}

export function clearReservationState() {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(RESERVATION_STORAGE_KEY);
  } catch {
    // Storage cleanup should never interrupt the reservation flow.
  }
}

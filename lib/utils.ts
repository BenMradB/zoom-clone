import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatElapsedTime(timeStr: string) {
  const start: Date = new Date(timeStr);
  const end: Date = new Date(); // current time
  const diff = Math.abs(end.valueOf() - start.valueOf()); // difference in milliseconds

  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  let result = "";

  if (days > 0) {
    result += `${days}d `;
  }

  if (hours > 0) {
    result += `${hours}Hr `;
  }

  if (minutes > 0) {
    result += `${minutes}min`;
  }

  return result.trim();
}

export function getCurrentDateTime(dateStr: Date) {
  // Format the time
  const hours = dateStr.getHours();
  const minutes = dateStr.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const twelveHourFormat = hours % 12 || 12;
  const time = `${twelveHourFormat.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  // Format the date
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[dateStr.getDay()];
  const date = dateStr.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[dateStr.getMonth()];
  const year = dateStr.getFullYear();
  const fullDate = `${dayOfWeek}, ${date} ${month} ${year}`;

  return [time, fullDate];
}

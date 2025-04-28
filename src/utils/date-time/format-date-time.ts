import { DateTime, type DateTimeOptions } from "luxon";

type FormatDateTimeOptions = {
  locale?: string;
  format?: string | Intl.DateTimeFormatOptions; // Luxon format string or Luxon preset
  luxonOptions?: DateTimeOptions; // Zone, numberingSystem, etc.
  fallback?: string; // What to return if the date is invalid
};

/**
 * Safely formats a date using Luxon with optional locale and formatting options.
 * Prevents the app from crashing on invalid inputs.
 */
export function formatDateTime(
  dateInput: DateTime | string | number | Date | null | undefined,
  options: FormatDateTimeOptions = {}
): string {
  const {
    locale = "en",
    format = DateTime.DATETIME_MED,
    luxonOptions = {},
    fallback = "Invalid date",
  } = options;

  let dateTime: DateTime;

  if (dateInput instanceof DateTime) {
    dateTime = dateInput;
  } else if (dateInput instanceof Date) {
    dateTime = DateTime.fromJSDate(dateInput, {
      locale,
      ...luxonOptions,
    });
  } else if (typeof dateInput === "string") {
    dateTime = DateTime.fromISO(dateInput, {
      locale,
      ...luxonOptions,
    });
  } else if (typeof dateInput === "number") {
    dateTime = DateTime.fromMillis(dateInput, {
      locale,
      ...luxonOptions,
    });
  } else {
    return fallback;
  }

  if (!dateTime.isValid) {
    return fallback;
  }

  return typeof format === "string"
    ? dateTime.setLocale(locale).toFormat(format)
    : dateTime.setLocale(locale).toLocaleString(format);
}

// Predefined formats for app
export const DATE_TIME_FORMAT = {
  DATE: "yyyy-MM-dd",
  TIME_12: "hh:mm a",
  TIME_24: "HH:mm",
  DATETIME: "yyyy-MM-dd HH:mm:ss",
};

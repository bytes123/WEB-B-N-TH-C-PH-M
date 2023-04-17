import React from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

export default function Time({ className, timestamp }) {
  return (
    <span className={className}>
      {formatRelative(subDays(new Date(timestamp), 0), new Date(timestamp))}
    </span>
  );
}

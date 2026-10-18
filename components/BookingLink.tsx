import { BOOKING_LABEL, BOOKING_URL } from "@/lib/site";

// Link to the booking calendar. The URL and default label come from
// lib/site.ts; pass `label` only when a page needs different wording (keep
// the duration from BOOKING_MINUTES).
export default function BookingLink({
  label = BOOKING_LABEL,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

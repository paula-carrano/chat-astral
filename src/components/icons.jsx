export function SignalMark() {
  return (
    <span className="signal-mark" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

export function PinIcon() {
  return (
    <span className="pin-icon" aria-hidden="true">
      <span></span>
    </span>
  );
}

export function UserIcon() {
  return <span className="user-icon" aria-hidden="true"></span>;
}

export function SendIcon() {
  return (
    <svg
      className="send-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 20.5 21 12 3.5 3.5l2.2 6.7L14 12l-8.3 1.8-2.2 6.7Z" />
    </svg>
  );
}

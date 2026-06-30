import { SendIcon } from "./icons";

export function ChatComposer({
  profile,
  message,
  isSending,
  onMessageChange,
  onSubmit,
}) {
  return (
    <form className="composer" aria-label="Panel de reporte" onSubmit={onSubmit}>
      <input type="text" value={profile.name} readOnly />
      <input type="text" value={profile.place} readOnly />
      <input
        type="text"
        placeholder="Reportar anomalia..."
        value={message}
        onChange={(event) => onMessageChange(event.target.value)}
        disabled={isSending}
      />
      <button
        type="submit"
        aria-label="Enviar reporte"
        disabled={!message.trim() || isSending}
      >
        <SendIcon />
      </button>
    </form>
  );
}

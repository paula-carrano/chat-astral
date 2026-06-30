export function formatMessageTime(createdAt) {
  const date =
    createdAt?.toDate?.() ||
    (typeof createdAt === "string" ? new Date(createdAt) : null);

  if (!date || Number.isNaN(date.getTime())) {
    return "Enviando...";
  }

  return new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

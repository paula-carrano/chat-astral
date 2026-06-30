export function getFirebaseErrorMessage(error, fallback) {
  const details = [error?.code, error?.message].filter(Boolean).join(" - ");

  return details ? `${fallback} (${details})` : fallback;
}

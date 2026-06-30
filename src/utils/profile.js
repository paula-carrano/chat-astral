const PROFILE_STORAGE_KEY = "survivorProfile";

export function getSavedProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));

    return {
      name: profile?.name || "Superviviente_Anonimo",
      place: profile?.place || "Ubicacion Desconocida",
    };
  } catch {
    return {
      name: "Superviviente_Anonimo",
      place: "Ubicacion Desconocida",
    };
  }
}

export function saveProfile({ name, place }) {
  const userName = name.trim() || "Superviviente_Anonimo";
  const userPlace = place.trim() || "Ubicacion Desconocida";

  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify({ name: userName, place: userPlace }),
  );
}

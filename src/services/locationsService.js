const DEFAULT_API_BASE_URL = "http://localhost:8080";

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
}

function normalizeLocation(location) {
  return {
    id: location.id,
    nombre: location.nombre,
    latitud: location.latitud,
    longitud: location.longitud,
  };
}

export async function getLocations() {
  const response = await fetch(`${getApiBaseUrl()}/ubicaciones/geo`);

  if (!response.ok) {
    throw new Error(`Error ${response.status} al cargar ubicaciones`);
  }

  const locations = await response.json();

  if (!Array.isArray(locations)) {
    throw new Error("La respuesta de ubicaciones no es una lista");
  }

  return locations.map(normalizeLocation);
}

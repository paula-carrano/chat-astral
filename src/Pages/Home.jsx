import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignalMark } from "../components/icons";
import { getLocations } from "../services/locationsService";
import { saveProfile } from "../utils/profile";

export function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [isLoadingLocations, setIsLoadingLocations] = useState(true);
  const [locationsError, setLocationsError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadLocations() {
      try {
        const loadedLocations = await getLocations();

        if (!isMounted) {
          return;
        }

        setLocations(loadedLocations);
        setSelectedLocationId(
          loadedLocations.length > 0 ? String(loadedLocations[0].id) : "",
        );
        setLocationsError("");
      } catch (error) {
        console.error(error);

        if (isMounted) {
          setLocationsError("No se pudieron cargar las ubicaciones.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingLocations(false);
        }
      }
    }

    loadLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const selectedLocation = locations.find(
      (location) => String(location.id) === selectedLocationId,
    );

    if (!selectedLocation) {
      return;
    }

    saveProfile({ name, location: selectedLocation });
    navigate("/chat");
  }

  return (
    <main className="screen home-screen container-fluid">
      <div className="row justify-content-center w-100">
        <section
          className="access-panel col-12 col-md-10 col-lg-8 col-xl-7"
          aria-labelledby="access-title"
        >
          <p className="eyebrow">
            <SignalMark />
            Transmision protegida
          </p>
          <h1 id="access-title" className="home-title">
            Chat de Supervivientes
          </h1>
          <p className="access-copy">
            Identificate para entrar al canal de emergencia. La conexion esta en
            modo visual de prueba.
          </p>

          <form className="access-form" onSubmit={handleSubmit}>
            <label>
              Nombre
              <input
                type="text"
                placeholder="Ej: Superviviente_01"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label>
              Ubicacion
              <select
                value={selectedLocationId}
                onChange={(event) => setSelectedLocationId(event.target.value)}
                disabled={isLoadingLocations || locations.length === 0}
              >
                {isLoadingLocations && (
                  <option value="">Cargando ubicaciones...</option>
                )}
                {!isLoadingLocations && locations.length === 0 && (
                  <option value="">Sin ubicaciones disponibles</option>
                )}
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.nombre}
                  </option>
                ))}
              </select>
            </label>
            {locationsError && (
              <p className="system-message warning-text">{locationsError}</p>
            )}
            {!isLoadingLocations &&
              !locationsError &&
              locations.length === 0 && (
                <p className="system-message warning-text">
                  No hay ubicaciones disponibles.
                </p>
              )}
            <button
              className="primary-action"
              type="submit"
              disabled={!selectedLocationId}
            >
              Ingresar
            </button>
          </form>
        </section>
      </div>

      <aside className="status-strip" aria-label="Estado de la senal">
        <span>Canal 07 activo</span>
        <span>Ruido bajo</span>
        <span>Ultimo pulso 07:24 p. m.</span>
      </aside>
    </main>
  );
}

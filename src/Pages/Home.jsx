import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignalMark } from "../components/icons";
import { saveProfile } from "../utils/profile";

export function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    saveProfile({ name, place });
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
              <input
                type="text"
                placeholder="Ej: Hospital Abandonado"
                value={place}
                onChange={(event) => setPlace(event.target.value)}
              />
            </label>
            <button className="primary-action" type="submit">
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

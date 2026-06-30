import { Link } from "react-router-dom";

function SignalMark() {
  return (
    <span className="signal-mark" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

export function Home() {
  return (
    <main className="screen home-screen">
      <section className="access-panel" aria-labelledby="access-title">
        <p className="eyebrow">
          <SignalMark />
          Transmision protegida
        </p>
        <h1 id="access-title">Chat de Supervivientes</h1>
        <p className="access-copy">
          Identificate para entrar al canal de emergencia. La conexion esta en
          modo visual de prueba.
        </p>

        <form className="access-form">
          <label>
            Nombre
            <input type="text" placeholder="Ej: Superviviente_01" />
          </label>
          <label>
            Ubicacion
            <input type="text" placeholder="Ej: Hospital Abandonado" />
          </label>
          <Link className="primary-action" to="/chat">
            Ingresar
          </Link>
        </form>
      </section>

      <aside className="status-strip" aria-label="Estado de la senal">
        <span>Canal 07 activo</span>
        <span>Ruido bajo</span>
        <span>Ultimo pulso 07:24 p. m.</span>
      </aside>
    </main>
  );
}

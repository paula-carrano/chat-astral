import { Link } from "react-router-dom";

const survivors = [
  {
    id: 1,
    name: "Operador_Radar",
    place: "Santuario Control",
    time: "07:23 p. m.",
    text: "Medium Gabriel en camino a revisar.",
    tone: "operator",
  },
  {
    id: 2,
    name: "Superviviente_01",
    place: "Hospital Abandonado",
    time: "07:13 p. m.",
    text: "Escuchamos ruidos en el subsuelo.",
    tone: "survivor",
  },
  {
    id: 3,
    name: "Lucia_Norte",
    place: "Estacion 4",
    time: "07:08 p. m.",
    text: "La niebla bajo de golpe. Nadie salga solo.",
    tone: "warning",
  },
  {
    id: 4,
    name: "Vigia_12",
    place: "Tunel Viejo",
    time: "06:59 p. m.",
    text: "Linternas al minimo. Hay movimiento cerca del porton.",
    tone: "survivor",
  },
];

function SignalMark() {
  return (
    <span className="signal-mark" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

function PinIcon() {
  return (
    <span className="pin-icon" aria-hidden="true">
      <span></span>
    </span>
  );
}

function UserIcon() {
  return <span className="user-icon" aria-hidden="true"></span>;
}

function ChatMessage({ message }) {
  return (
    <article className={`chat-message ${message.tone}`}>
      <div className="message-meta">
        <span>
          <UserIcon />
          {message.name}
        </span>
        <span>
          <PinIcon />
          {message.place}
        </span>
      </div>
      <p>{message.text}</p>
      <time>{message.time}</time>
    </article>
  );
}

export function ChatPage() {
  return (
    <main className="screen chat-screen">
      <header className="chat-header">
        <div>
          <p className="eyebrow">
            <SignalMark />
            Transmision en vivo
          </p>
          <h1>Chat de Supervivientes</h1>
        </div>
        <Link className="ghost-action" to="/">
          Salir
        </Link>
      </header>

      <section className="chat-log" aria-label="Mensajes del canal">
        {survivors.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </section>

      <footer className="composer" aria-label="Panel de reporte">
        <select defaultValue="Operador_Radar" aria-label="Usuario">
          <option>Operador_Radar</option>
          <option>Superviviente_01</option>
          <option>Lucia_Norte</option>
        </select>
        <select defaultValue="Santuario Control" aria-label="Ubicacion">
          <option>Santuario Control</option>
          <option>Hospital Abandonado</option>
          <option>Estacion 4</option>
          <option>Tunel Viejo</option>
        </select>
        <input type="text" placeholder="Reportar anomalia..." disabled />
        <button type="button" aria-label="Enviar reporte">
          <span></span>
        </button>
      </footer>
    </main>
  );
}

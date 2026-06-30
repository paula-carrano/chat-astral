import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "MensajesSobrevivientes";

function getSavedProfile() {
    try {
        const profile = JSON.parse(localStorage.getItem("survivorProfile"));

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

function formatMessageTime(createdAt) {
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

function getFirebaseErrorMessage(error, fallback) {
    const details = [error?.code, error?.message].filter(Boolean).join(" - ");

    return details ? `${fallback} (${details})` : fallback;
}

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

function SendIcon() {
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

function ChatMessage({ message }) {
    const author = message.autor || message.name;
    const place = message.ubicacion || message.place;
    const text = message.mensaje || message.text;
    const date = message.fecha || message.createdAt;

    return (
        <article
            className={`chat-message survivor ${message.isPending ? "pending" : ""}`}
        >
            <div className="message-meta">
                <span>
                    <UserIcon />
                    {author}
                </span>
                <span>
                    <PinIcon />
                    {place}
                </span>
            </div>
            <p>{text}</p>
            <time>
                {message.isPending ? "Enviando..." : formatMessageTime(date)}
            </time>
        </article>
    );
}

export function ChatPage() {
    const profile = useMemo(() => getSavedProfile(), []);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [sendStatus, setSendStatus] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const messagesQuery = query(
            collection(db, COLLECTION_NAME),
            orderBy("fecha", "asc"),
        );

        const unsubscribe = onSnapshot(
            messagesQuery,
            { includeMetadataChanges: true },
            (snapshot) => {
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        isPending: doc.metadata.hasPendingWrites,
                        ...doc.data(),
                    })),
                );
                setIsLoading(false);
            },
            (snapshotError) => {
                console.error(snapshotError);
                setError(
                    getFirebaseErrorMessage(
                        snapshotError,
                        "No se pudo conectar con la transmision.",
                    ),
                );
                setIsLoading(false);
            },
        );

        return unsubscribe;
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function handleSubmit(event) {
        event.preventDefault();

        const text = newMessage.trim();

        if (!text || isSending) {
            return;
        }

        setIsSending(true);
        setError("");
        setSendStatus("");

        try {
            const payload = {
                autor: profile.name,
                ubicacion: profile.place,
                mensaje: text,
                fecha: new Date().toISOString(),
            };
            console.log("Enviando mensaje a Firestore:", {
                collection: COLLECTION_NAME,
                payload,
            });

            const docRef = await addDoc(
                collection(db, COLLECTION_NAME),
                payload,
            );
            console.log("Mensaje guardado en Firestore:", docRef.id);
            setNewMessage("");
            setSendStatus(`Reporte enviado: ${docRef.id}`);
        } catch (sendError) {
            console.error(sendError);
            setError(
                getFirebaseErrorMessage(
                    sendError,
                    "No se pudo enviar el reporte.",
                ),
            );
        } finally {
            setIsSending(false);
        }
    }

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
                {isLoading && <p className="system-message">Conectando...</p>}
                {!isLoading && messages.length === 0 && (
                    <p className="system-message">No hay reportes todavia.</p>
                )}
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} aria-hidden="true" />
            </section>

            {error && <p className="system-message warning-text">{error}</p>}
            {sendStatus && (
                <p className="system-message success-text">{sendStatus}</p>
            )}

            <form
                className="composer"
                aria-label="Panel de reporte"
                onSubmit={handleSubmit}
            >
                <input type="text" value={profile.name} readOnly />
                <input type="text" value={profile.place} readOnly />
                <input
                    type="text"
                    placeholder="Reportar anomalia..."
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    disabled={isSending}
                />
                <button
                    type="submit"
                    aria-label="Enviar reporte"
                    disabled={!newMessage.trim() || isSending}
                >
                    <SendIcon />
                </button>
            </form>
        </main>
    );
}

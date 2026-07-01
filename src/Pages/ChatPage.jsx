import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChatComposer } from "../components/ChatComposer";
import { ChatMessage } from "../components/ChatMessage";
import { SignalMark } from "../components/icons";
import { sendMessage, subscribeToMessages } from "../services/messagesService";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import { getSavedProfile } from "../utils/profile";

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
        return subscribeToMessages({
            onMessages: (incomingMessages) => {
                setMessages(incomingMessages);
                setIsLoading(false);
            },
            onError: (snapshotError) => {
                console.error(snapshotError);
                setError(
                    getFirebaseErrorMessage(
                        snapshotError,
                        "No se pudo conectar con la transmision.",
                    ),
                );
                setIsLoading(false);
            },
        });
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
            const docRef = await sendMessage({ profile, text });

            setNewMessage("");
            setSendStatus(`Reporte enviado: ${docRef.id}-rp`);
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
                <p className="eyebrow">
                    <SignalMark />
                    Transmision en vivo
                </p>
                <div className="chat-title-row d-flex align-items-start justify-content-between gap-3">
                    <div className="chat-title-block">
                        <h1>Chat de Supervivientes</h1>
                    </div>
                    <Link
                        className="ghost-action flex-shrink-0 align-self-start"
                        to="/"
                    >
                        Salir
                    </Link>
                </div>
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

            <ChatComposer
                profile={profile}
                message={newMessage}
                isSending={isSending}
                onMessageChange={setNewMessage}
                onSubmit={handleSubmit}
            />
        </main>
    );
}

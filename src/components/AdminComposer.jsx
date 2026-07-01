export function AdminComposer({
    message,
    onMessageChange,
    onSubmit,
    isSending,
}) {
    return (
        <form className="composer" onSubmit={onSubmit}>
            <textarea
                rows={4}
                placeholder="Escriba un evento para todos los supervivientes..."
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
            />

            <button
                disabled={!message.trim() || isSending}
                type="submit"
            >
                Enviar evento
            </button>
        </form>
    );
}
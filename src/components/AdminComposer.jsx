export function AdminComposer({
    question,
    optionA,
    optionB,
    optionC,
    onQuestionChange,
    onOptionAChange,
    onOptionBChange,
    onOptionCChange,
    onSubmit,
    isSending,
}) {
    return (
        <form className="admin-composer" onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Pregunta de la votación..."
                value={question}
                onChange={(e) => onQuestionChange(e.target.value)}
                disabled={isSending}
            />

            <input
                type="text"
                placeholder="Opción A"
                value={optionA}
                onChange={(e) => onOptionAChange(e.target.value)}
                disabled={isSending}
            />

            <input
                type="text"
                placeholder="Opción B"
                value={optionB}
                onChange={(e) => onOptionBChange(e.target.value)}
                disabled={isSending}
            />

            <input
                type="text"
                placeholder="Opción C"
                value={optionC}
                onChange={(e) => onOptionCChange(e.target.value)}
                disabled={isSending}
            />

            <button
                type="submit"
                disabled={
                    !question.trim() ||
                    !optionA.trim() ||
                    !optionB.trim() ||
                    !optionC.trim() ||
                    isSending
                }
            >
                Publicar votación
            </button>
        </form>
    );
}
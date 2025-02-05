export default function Panel({ isActive, children, togglePanel }) {
    if (isActive) {
        return (
            <>
                <p>{children}</p>
                <button onClick={() => togglePanel(false)}>Close</button>
            </>
        )
    }
    return <button onClick={() => togglePanel(true)}>Ouvre moi</button>;
}
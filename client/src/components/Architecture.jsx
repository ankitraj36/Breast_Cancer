export default function Architecture() {
    const nodes = [
        { icon: '👤', label: 'User' },
        { icon: '🌐', label: 'React App' },
        { icon: '📝', label: 'Symptom Input' },
        { icon: '🤖', label: 'Gemini AI' },
        { icon: '📊', label: 'Risk Analysis' },
        { icon: '🗄️', label: 'MongoDB' },
        { icon: '👩‍⚕️', label: 'Doctor Support' }
    ]

    return (
        <section>
            <div className="section">
                <h2 className="section-title">🏗️ System Architecture</h2>
                <p className="section-subtitle">
                    End-to-end workflow from user input to AI-powered health recommendations.
                </p>
                <div className="architecture-flow scroll-reveal">
                    {nodes.map((n, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className="arch-node">
                                <div className="arch-node-icon">{n.icon}</div>
                                <div className="arch-node-label">{n.label}</div>
                            </div>
                            {i < nodes.length - 1 && <div className="arch-arrow">→</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

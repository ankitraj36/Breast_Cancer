export default function FutureScope() {
    const futures = [
        {
            icon: '🧬',
            title: 'Advanced AI Prediction',
            desc: 'Deep learning models trained on medical datasets for higher accuracy risk prediction and pattern recognition.'
        },
        {
            icon: '🏥',
            title: 'Hospital Integration',
            desc: 'Direct integration with hospital systems for seamless appointment scheduling, records, and telemedicine.'
        },
        {
            icon: '📱',
            title: 'Mobile Application',
            desc: 'Native iOS and Android apps with push notifications for screening reminders and health tracking.'
        },
        {
            icon: '🌐',
            title: 'Multi-Language Support',
            desc: 'Accessibility for diverse communities through multilingual content and region-specific health resources.'
        }
    ]

    return (
        <section className="section-alt">
            <div className="section">
                <h2 className="section-title">🚀 Future Scope</h2>
                <p className="section-subtitle">
                    Our roadmap for expanding the impact of breast cancer early detection.
                </p>
                <div className="cards-grid-4">
                    {futures.map((f, i) => (
                        <div key={i} className="card future-card scroll-reveal">
                            <div className="card-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

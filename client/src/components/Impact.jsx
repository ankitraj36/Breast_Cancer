export default function Impact() {
    const impacts = [
        {
            icon: '🩺',
            title: 'Early Diagnosis',
            desc: 'AI-powered analysis enables earlier identification of potential risk factors, improving treatment outcomes significantly.'
        },
        {
            icon: '📢',
            title: 'Awareness Improvement',
            desc: 'Educational resources and interactive tools help communities understand breast cancer prevention and screening importance.'
        },
        {
            icon: '🏥',
            title: 'Community Healthcare',
            desc: 'Connecting individuals with medical professionals and support groups strengthens community health infrastructure.'
        }
    ]

    return (
        <section id="impact">
            <div className="section">
                <h2 className="section-title">🌍 Impact & Benefits</h2>
                <p className="section-subtitle">
                    Making a real difference in breast cancer awareness and early detection.
                </p>
                <div className="cards-grid-3">
                    {impacts.map((item, i) => (
                        <div key={i} className="card impact-card scroll-reveal">
                            <div className="card-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

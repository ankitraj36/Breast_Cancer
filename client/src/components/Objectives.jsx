export default function Objectives() {
    const objectives = [
        {
            icon: '🔬',
            title: 'Promote Early Detection',
            desc: 'Provide accessible digital tools for self-examination and AI-powered risk assessment to encourage early detection.'
        },
        {
            icon: '📢',
            title: 'Increase Awareness',
            desc: 'Educate communities about breast cancer risk factors, symptoms, and the importance of regular screening.'
        },
        {
            icon: '💻',
            title: 'Digital Health Support',
            desc: 'Offer AI-powered health assistance, symptom analysis, and connect users with medical professionals.'
        }
    ]

    return (
        <section id="objectives">
            <div className="section">
                <h2 className="section-title">🎯 Our Objectives</h2>
                <p className="section-subtitle">
                    A comprehensive approach to breast cancer awareness through technology and innovation.
                </p>
                <div className="cards-grid-3">
                    {objectives.map((o, i) => (
                        <div key={i} className="card objective-card scroll-reveal">
                            <div className="card-icon">{o.icon}</div>
                            <h3>{o.title}</h3>
                            <p>{o.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

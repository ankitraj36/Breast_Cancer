export default function Features() {
    const features = [
        {
            icon: '🔍',
            tag: 'AI Powered',
            title: 'Symptom Checker',
            desc: 'AI-powered multi-step questionnaire that analyzes your symptoms and provides a personalized risk assessment with recommendations.',
            link: '#symptom-checker'
        },
        {
            icon: '🧠',
            tag: 'Machine Learning',
            title: 'AI Risk Analysis',
            desc: 'Advanced Gemini AI integration for intelligent symptom pattern recognition and evidence-based risk level estimation.',
            link: '#symptom-checker'
        },
        {
            icon: '📚',
            tag: 'Educational',
            title: 'Learning Resources',
            desc: 'Comprehensive educational materials about breast health, self-examination techniques, prevention strategies, and more.'
        },
        {
            icon: '👩‍⚕️',
            tag: 'Support',
            title: 'Doctor Connect',
            desc: 'Direct connection to medical professionals, support groups, and healthcare resources in your area.',
            link: '#contact'
        }
    ]

    return (
        <section id="features">
            <div className="section">
                <h2 className="section-title">⭐ Key Features</h2>
                <p className="section-subtitle">
                    Interactive tools and AI-powered analysis for comprehensive breast health support.
                </p>
                <div className="cards-grid-4">
                    {features.map((f, i) => (
                        <a
                            key={i}
                            href={f.link || '#'}
                            className="card feature-card scroll-reveal"
                            style={{ display: 'block' }}
                        >
                            <span className="feature-tag">{f.tag}</span>
                            <div className="card-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

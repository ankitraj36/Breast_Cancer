export default function ProposedSolution() {
    const solutions = [
        {
            icon: '🌐',
            title: 'Awareness Platform',
            desc: 'A comprehensive web application providing breast cancer education, resources, and community support.'
        },
        {
            icon: '🤲',
            title: 'Self-Examination Guide',
            desc: 'Step-by-step interactive guide for breast self-examination with visual instructions and reminders.'
        },
        {
            icon: '🤖',
            title: 'AI Risk Prediction',
            desc: 'Gemini AI-powered symptom analysis providing personalized risk assessments and health recommendations.'
        },
        {
            icon: '⏰',
            title: 'Screening Reminders',
            desc: 'Automated reminder system for regular breast screenings and follow-up appointments.'
        }
    ]

    return (
        <section className="section-alt">
            <div className="section">
                <h2 className="section-title">💡 Proposed Solution</h2>
                <p className="section-subtitle">
                    An integrated AI-powered platform combining awareness, detection, and support.
                </p>
                <div className="cards-grid-4">
                    {solutions.map((s, i) => (
                        <div key={i} className="card solution-card scroll-reveal">
                            <div className="card-icon">{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

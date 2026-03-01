export default function WorkingModel() {
    const steps = [
        {
            title: 'User Registration',
            desc: 'Create an account or continue as a guest to access the symptom checker and health resources.',
            icon: '📝'
        },
        {
            title: 'Enter Symptoms',
            desc: 'Select from a comprehensive list of symptoms and provide additional health information.',
            icon: '🔍'
        },
        {
            title: 'AI Risk Prediction',
            desc: 'Gemini AI analyzes your symptoms against medical patterns to generate a personalized risk assessment.',
            icon: '🤖'
        },
        {
            title: 'Health Recommendation',
            desc: 'Receive detailed recommendations, screening suggestions, and connect with healthcare professionals.',
            icon: '💊'
        }
    ]

    return (
        <section className="section-alt">
            <div className="section">
                <h2 className="section-title">⚙️ How It Works</h2>
                <p className="section-subtitle">
                    A simple, intuitive process from symptom input to actionable health guidance.
                </p>
                <div className="steps-container">
                    {steps.map((s, i) => (
                        <div key={i} className="step-item scroll-reveal">
                            <div className="step-number">{i + 1}</div>
                            <div className="step-content">
                                <h3>{s.icon} {s.title}</h3>
                                <p>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

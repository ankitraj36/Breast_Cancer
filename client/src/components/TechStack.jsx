export default function TechStack() {
    const techs = [
        {
            icon: '⚛️',
            title: 'Frontend',
            items: ['React 18', 'Vite', 'CSS3 + Glassmorphism', 'Responsive Design']
        },
        {
            icon: '🖥️',
            title: 'Backend',
            items: ['Node.js', 'Express.js', 'RESTful APIs', 'CORS Middleware']
        },
        {
            icon: '🗄️',
            title: 'Database',
            items: ['MongoDB', 'Mongoose ODM', 'Schema Validation', 'Cloud Atlas Ready']
        },
        {
            icon: '🤖',
            title: 'AI / ML',
            items: ['Google Gemini AI', 'Symptom Analysis', 'Risk Prediction', 'Health Chatbot']
        }
    ]

    return (
        <section id="tech" className="section-alt">
            <div className="section">
                <h2 className="section-title">🧰 Technology Stack</h2>
                <p className="section-subtitle">
                    Built with modern, production-grade technologies for reliability and scalability.
                </p>
                <div className="cards-grid-4">
                    {techs.map((t, i) => (
                        <div key={i} className="card tech-card scroll-reveal">
                            <div className="card-icon">{t.icon}</div>
                            <h3>{t.title}</h3>
                            <ul className="tech-list">
                                {t.items.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

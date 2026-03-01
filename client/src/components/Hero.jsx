export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-content scroll-reveal">
                <div className="hero-ribbon">🎀</div>
                <h1>
                    Early Detection Saves Lives
                    <span className="highlight">AI-Powered Breast Cancer Awareness System</span>
                </h1>
                <p>
                    Empowering women with AI-driven symptom analysis, self-examination guides,
                    and early detection tools. Your health journey starts here.
                </p>
                <div className="hero-buttons">
                    <a href="#symptom-checker" className="btn btn-primary">
                        🔍 Check Symptoms
                    </a>
                    <a href="#features" className="btn btn-secondary">
                        📖 Self-Exam Guide
                    </a>
                    <a href="#contact" className="btn btn-outline">
                        🏥 Get Support
                    </a>
                </div>
            </div>
        </section>
    )
}

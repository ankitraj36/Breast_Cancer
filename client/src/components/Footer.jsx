export default function Footer() {
    const quickLinks = [
        { href: '#home', label: 'Home' },
        { href: '#features', label: 'Features' },
        { href: '#symptom-checker', label: 'AI Checker' },
        { href: '#tech', label: 'Tech Stack' },
        { href: '#contact', label: 'Contact' },
    ]

    const resources = [
        { href: '#problem', label: 'Problem Statement' },
        { href: '#objectives', label: 'Objectives' },
        { href: '#impact', label: 'Impact' },
        { href: '#', label: 'Self-Exam Guide' },
        { href: '#', label: 'Screening Info' },
    ]

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <span>🎀</span> BreastGuard AI
                    </div>
                    <p>
                        Empowering women through AI-powered breast cancer awareness, early detection,
                        and digital health support. Together, we can make a difference.
                    </p>
                    <div className="footer-social">
                        <a href="#" aria-label="Twitter">𝕏</a>
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="Instagram">📷</a>
                        <a href="#" aria-label="LinkedIn">in</a>
                    </div>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <ul className="footer-links">
                        {quickLinks.map(l => (
                            <li key={l.label}><a href={l.href}>{l.label}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Resources</h4>
                    <ul className="footer-links">
                        {resources.map(l => (
                            <li key={l.label}><a href={l.href}>{l.label}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                🎀 Breast Cancer Awareness — Early Detection Saves Lives &nbsp;|&nbsp;
                © {new Date().getFullYear()} BreastGuard AI. Built with ❤️ for health.
            </div>
        </footer>
    )
}

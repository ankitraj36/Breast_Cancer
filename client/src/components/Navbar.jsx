import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const links = [
        { href: '#home', label: 'Home' },
        { href: '#problem', label: 'Problem' },
        { href: '#features', label: 'Features' },
        { href: '#symptom-checker', label: 'AI Checker' },
        { href: '#tech', label: 'Tech' },
        { href: '#impact', label: 'Impact' },
        { href: '#contact', label: 'Contact' },
    ]

    const handleClick = () => setOpen(false)

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <a href="#home" className="nav-logo">
                <span>🎀</span> BreastGuard AI
            </a>
            <ul className={`nav-links ${open ? 'open' : ''}`}>
                {links.map(l => (
                    <li key={l.href}>
                        <a href={l.href} onClick={handleClick}>{l.label}</a>
                    </li>
                ))}
            </ul>
            <button
                className={`hamburger ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
            >
                <span /><span /><span />
            </button>
        </nav>
    )
}

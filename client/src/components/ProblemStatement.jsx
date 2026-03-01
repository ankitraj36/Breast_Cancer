import { useState, useEffect, useRef } from 'react'

function Counter({ end, suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true
                    const start = Date.now()
                    const tick = () => {
                        const elapsed = Date.now() - start
                        const progress = Math.min(elapsed / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3) // ease-out
                        setCount(Math.floor(eased * end))
                        if (progress < 1) requestAnimationFrame(tick)
                    }
                    requestAnimationFrame(tick)
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [end, duration])

    return (
        <div className="counter-item scroll-reveal" ref={ref}>
            <div className="counter-value">{count.toLocaleString()}{suffix}</div>
            <div className="counter-label">{/* label passed as children */}</div>
        </div>
    )
}

export default function ProblemStatement() {
    const problems = [
        {
            icon: '⚠️',
            title: 'Lack of Awareness',
            desc: 'Many women remain unaware of breast cancer risk factors, self-examination techniques, and available screening options.'
        },
        {
            icon: '⏰',
            title: 'Late Detection',
            desc: 'Over 60% of cases are detected at advanced stages due to lack of regular screening and awareness programs.'
        },
        {
            icon: '📊',
            title: 'Alarming Statistics',
            desc: 'Breast cancer is the most common cancer among women globally, with 2.3 million new cases diagnosed annually.'
        }
    ]

    const stats = [
        { value: 2300000, suffix: '+', label: 'New Cases Annually' },
        { value: 685000, suffix: '+', label: 'Annual Deaths Worldwide' },
        { value: 99, suffix: '%', label: 'Survival Rate if Detected Early' },
        { value: 1, suffix: ' in 8', label: 'Women Will Be Diagnosed' }
    ]

    return (
        <section id="problem" className="section-alt">
            <div className="section">
                <h2 className="section-title">⚠️ The Problem We're Solving</h2>
                <p className="section-subtitle">
                    Breast cancer remains a critical health challenge — but awareness and early detection can save lives.
                </p>
                <div className="cards-grid-3 problem-cards">
                    {problems.map((p, i) => (
                        <div key={i} className="card scroll-reveal">
                            <div className="card-icon">{p.icon}</div>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="counter-row">
                    {stats.map((s, i) => (
                        <CounterItem key={i} end={s.value} suffix={s.suffix} label={s.label} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function CounterItem({ end, suffix, label }) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true
                    const duration = 2000
                    const start = Date.now()
                    const tick = () => {
                        const elapsed = Date.now() - start
                        const progress = Math.min(elapsed / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setCount(Math.floor(eased * end))
                        if (progress < 1) requestAnimationFrame(tick)
                    }
                    requestAnimationFrame(tick)
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [end])

    return (
        <div className="counter-item scroll-reveal" ref={ref}>
            <div className="counter-value">{count.toLocaleString()}{suffix}</div>
            <div className="counter-label">{label}</div>
        </div>
    )
}

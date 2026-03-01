import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemStatement from './components/ProblemStatement'
import Objectives from './components/Objectives'
import ProposedSolution from './components/ProposedSolution'
import Features from './components/Features'
import SymptomChecker from './components/SymptomChecker'
import TechStack from './components/TechStack'
import Architecture from './components/Architecture'
import WorkingModel from './components/WorkingModel'
import Impact from './components/Impact'
import FutureScope from './components/FutureScope'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIChatbot from './components/AIChatbot'

function App() {
    useEffect(() => {
        // Scroll-reveal animation using Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    // Re-observe elements after each render (for dynamically added elements)
    useEffect(() => {
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible')
                        }
                    })
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            )
            document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => observer.observe(el))
            return () => observer.disconnect()
        }, 500)
        return () => clearTimeout(timer)
    })

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ProblemStatement />
                <Objectives />
                <ProposedSolution />
                <Features />
                <SymptomChecker />
                <TechStack />
                <Architecture />
                <WorkingModel />
                <Impact />
                <FutureScope />
                <Contact />
            </main>
            <Footer />
            <AIChatbot />
        </>
    )
}

export default App

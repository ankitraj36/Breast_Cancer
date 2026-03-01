import { useState } from 'react'

const SYMPTOMS_LIST = [
    'Lump in breast or underarm',
    'Change in breast size or shape',
    'Nipple discharge',
    'Skin changes or dimpling',
    'Breast pain or tenderness',
    'Swelling in breast or armpit',
    'Redness or flaky skin',
    'Nipple retraction or inversion',
    'Unusual warmth in breast',
    'Persistent itching'
]

export default function SymptomChecker() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        age: '',
        symptoms: [],
        familyHistory: false,
        additionalInfo: ''
    })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const toggleSymptom = (symptom) => {
        setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptom)
                ? prev.symptoms.filter(s => s !== symptom)
                : [...prev.symptoms, symptom]
        }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/symptoms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                setResult(data.analysis)
                setStep(4)
            }
        } catch (err) {
            // Fallback if backend not available
            setResult({
                riskLevel: 'Moderate',
                explanation: 'Unable to connect to AI service. Please ensure the server is running. This is a demo result.',
                recommendations: [
                    'Consult a healthcare professional for proper evaluation',
                    'Perform regular self-examinations',
                    'Schedule a mammogram if over 40',
                    'Track any changes in symptoms'
                ],
                urgency: 'Please consult a healthcare provider for an accurate assessment.'
            })
            setStep(4)
        }
        setLoading(false)
    }

    const reset = () => {
        setStep(1)
        setFormData({ age: '', symptoms: [], familyHistory: false, additionalInfo: '' })
        setResult(null)
    }

    return (
        <section id="symptom-checker" className="section-pink">
            <div className="section">
                <h2 className="section-title">🔍 AI Symptom Checker</h2>
                <p className="section-subtitle">
                    Get an AI-powered preliminary assessment. This is not a medical diagnosis.
                </p>

                <div className="symptom-checker scroll-reveal">
                    <div className="form-progress">
                        {[1, 2, 3].map(n => (
                            <div
                                key={n}
                                className={`step-dot ${step === n ? 'active' : ''} ${step > n ? 'completed' : ''}`}
                            />
                        ))}
                    </div>

                    {step === 1 && (
                        <div>
                            <h3>Step 1: Basic Information</h3>
                            <p className="checker-subtitle">Tell us a bit about yourself</p>
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input
                                    id="age"
                                    type="number"
                                    placeholder="Enter your age"
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                    min="1"
                                    max="120"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.familyHistory}
                                        onChange={e => setFormData({ ...formData, familyHistory: e.target.checked })}
                                        style={{ marginRight: 10, accentColor: 'var(--pink-primary)' }}
                                    />
                                    Family history of breast cancer
                                </label>
                            </div>
                            <div className="form-buttons">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => formData.age && setStep(2)}
                                    disabled={!formData.age}
                                    style={{ opacity: formData.age ? 1 : 0.5 }}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h3>Step 2: Select Symptoms</h3>
                            <p className="checker-subtitle">Select all symptoms you are experiencing</p>
                            <div className="checkbox-group">
                                {SYMPTOMS_LIST.map(s => (
                                    <label
                                        key={s}
                                        className={`checkbox-item ${formData.symptoms.includes(s) ? 'checked' : ''}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.symptoms.includes(s)}
                                            onChange={() => toggleSymptom(s)}
                                        />
                                        {s}
                                    </label>
                                ))}
                            </div>
                            <div className="form-buttons" style={{ marginTop: 28 }}>
                                <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => formData.symptoms.length > 0 && setStep(3)}
                                    disabled={formData.symptoms.length === 0}
                                    style={{ opacity: formData.symptoms.length > 0 ? 1 : 0.5 }}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h3>Step 3: Additional Details</h3>
                            <p className="checker-subtitle">Any other information to help with analysis</p>
                            <div className="form-group">
                                <label htmlFor="additional">Additional Information (optional)</label>
                                <textarea
                                    id="additional"
                                    placeholder="Describe any other symptoms, duration, or concerns..."
                                    value={formData.additionalInfo}
                                    onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
                                />
                            </div>
                            <div className="disclaimer">
                                ⚠️ <strong>Disclaimer:</strong> This tool provides a preliminary assessment only and is not a substitute for professional medical advice. Always consult a healthcare provider.
                            </div>
                            <div className="form-buttons">
                                <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
                                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                                    {loading ? '🔄 Analyzing with AI...' : '🤖 Get AI Analysis'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && result && (
                        <div className="result-card">
                            <h3>🤖 AI Analysis Result</h3>
                            <div className={`risk-badge ${result.riskLevel.toLowerCase()}`}>
                                {result.riskLevel} Risk
                            </div>
                            <p>{result.explanation}</p>
                            {result.urgency && (
                                <div className="urgency">🕐 {result.urgency}</div>
                            )}
                            <ul className="recommendations">
                                {result.recommendations.map((r, i) => (
                                    <li key={i}>✅ {r}</li>
                                ))}
                            </ul>
                            <div className="disclaimer">
                                ⚠️ This assessment is AI-generated and for informational purposes only. It is NOT a medical diagnosis. Please consult a qualified healthcare professional for proper evaluation.
                            </div>
                            <div className="form-buttons" style={{ marginTop: 24, justifyContent: 'center' }}>
                                <button className="btn btn-primary" onClick={reset}>
                                    🔄 Check Again
                                </button>
                                <a href="#contact" className="btn btn-secondary">
                                    👩‍⚕️ Contact a Doctor
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

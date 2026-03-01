import { useState, useRef, useEffect } from 'react'

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content: 'Hello! 🎀 I\'m your Breast Health AI Assistant. I can help with:\n\n• Self-examination techniques\n• Risk factors & symptoms\n• Prevention tips\n• Screening guidance\n\nHow can I help you today?'
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesRef = useRef(null)

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    }, [messages, loading])

    const sendMessage = async () => {
        if (!input.trim() || loading) return

        const userMsg = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMsg }])
        setLoading(true)

        try {
            const history = messages
                .filter(m => m.role !== 'bot' || messages.indexOf(m) > 0)
                .map(m => ({
                    role: m.role === 'bot' ? 'model' : 'user',
                    content: m.content
                }))

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, history })
            })
            const data = await res.json()
            setMessages(prev => [...prev, {
                role: 'bot',
                content: data.reply || 'I\'m sorry, I couldn\'t process that. Please try again.'
            }])
        } catch {
            setMessages(prev => [...prev, {
                role: 'bot',
                content: 'I\'m currently unable to connect to the AI service. Here are some general tips:\n\n• Perform monthly self-examinations\n• Schedule regular screenings\n• Consult your doctor for any concerns\n\n*Please ensure the server is running for full AI capabilities.*'
            }])
        }
        setLoading(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <>
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? '✕' : '🤖'}
            </button>

            {isOpen && (
                <div className="chatbot-panel">
                    <div className="chatbot-header">
                        <h4>🤖 AI Health Assistant</h4>
                        <button onClick={() => setIsOpen(false)} aria-label="Close chat">✕</button>
                    </div>

                    <div className="chatbot-messages" ref={messagesRef}>
                        {messages.map((m, i) => (
                            <div key={i} className={`chat-msg ${m.role === 'bot' ? 'bot' : 'user'}`}>
                                {m.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-typing">
                                <span /><span /><span />
                            </div>
                        )}
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Ask about breast health..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={sendMessage} disabled={loading} aria-label="Send message">
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

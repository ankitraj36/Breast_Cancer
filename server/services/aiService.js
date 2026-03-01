const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;
let model = null;

const initAI = () => {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
        try {
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
            console.log('✅ Gemini AI initialized successfully');
            return true;
        } catch (err) {
            console.log('⚠️ Gemini AI init failed, using fallback:', err.message);
            return false;
        }
    }
    console.log('ℹ️ No Gemini API key — using rule-based fallback');
    return false;
};

// ─── AI Symptom Analysis ──────────────────────────────────
const analyzeSymptoms = async (symptoms, age, familyHistory, additionalInfo) => {
    if (model) {
        try {
            const prompt = `You are a medical AI assistant specializing in breast cancer awareness and early detection.
A user has provided the following information for a preliminary risk assessment:

Age: ${age}
Symptoms: ${symptoms.join(', ')}
Family History of Breast Cancer: ${familyHistory ? 'Yes' : 'No'}
Additional Information: ${additionalInfo || 'None provided'}

Based on this information, provide a JSON response with EXACTLY this structure (no markdown, no code blocks, just pure JSON):
{
  "riskLevel": "Low" or "Moderate" or "High",
  "explanation": "A clear, compassionate explanation of the assessment in 2-3 sentences",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3", "recommendation 4"],
  "urgency": "A one-line note about when to see a doctor"
}

IMPORTANT DISCLAIMERS to include in your explanation:
- This is NOT a medical diagnosis
- Always recommend consulting a healthcare professional
- Be compassionate and encouraging about early detection`;

            const result = await model.generateContent(prompt);
            const text = result.response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            return JSON.parse(text);
        } catch (err) {
            console.error('AI analysis error, falling back:', err.message);
        }
    }

    return fallbackAnalysis(symptoms, age, familyHistory);
};

// ─── Rule-Based Fallback ──────────────────────────────────
const fallbackAnalysis = (symptoms, age, familyHistory) => {
    let riskScore = 0;

    const highRiskSymptoms = ['lump', 'nipple discharge', 'skin changes', 'breast pain', 'swelling'];
    const moderateSymptoms = ['redness', 'dimpling', 'nipple retraction', 'unusual warmth'];

    symptoms.forEach(s => {
        const lower = s.toLowerCase();
        if (highRiskSymptoms.some(h => lower.includes(h))) riskScore += 3;
        else if (moderateSymptoms.some(m => lower.includes(m))) riskScore += 2;
        else riskScore += 1;
    });

    if (familyHistory) riskScore += 3;
    if (age > 50) riskScore += 2;
    else if (age > 40) riskScore += 1;

    let riskLevel, explanation, recommendations;

    if (riskScore >= 8) {
        riskLevel = 'High';
        explanation = 'Based on the symptoms and risk factors you\'ve described, we recommend seeking medical attention promptly. Please remember this is not a diagnosis — a healthcare professional can provide proper evaluation and peace of mind.';
        recommendations = [
            'Schedule an appointment with your doctor as soon as possible',
            'Request a clinical breast examination',
            'Ask about mammography or ultrasound screening',
            'Keep a detailed record of your symptoms including dates and changes'
        ];
    } else if (riskScore >= 4) {
        riskLevel = 'Moderate';
        explanation = 'Some of your symptoms and risk factors warrant attention. While this doesn\'t necessarily indicate a serious condition, it\'s important to have a professional evaluation. Early detection is key to positive outcomes.';
        recommendations = [
            'Schedule a check-up with your healthcare provider within the next few weeks',
            'Perform regular breast self-examinations monthly',
            'Track any changes in your symptoms',
            'Discuss your family history with your doctor'
        ];
    } else {
        riskLevel = 'Low';
        explanation = 'Based on the information provided, your current risk factors appear to be low. However, regular screening and self-examination remain important for everyone. Stay proactive about your breast health!';
        recommendations = [
            'Continue performing monthly breast self-examinations',
            'Schedule regular annual check-ups',
            'Maintain a healthy lifestyle with regular exercise',
            'Stay informed about breast cancer awareness'
        ];
    }

    return {
        riskLevel,
        explanation,
        recommendations,
        urgency: riskLevel === 'High'
            ? 'Please see a doctor within the next few days.'
            : riskLevel === 'Moderate'
                ? 'Consider scheduling a visit within the next 2-4 weeks.'
                : 'Continue regular screenings as recommended for your age group.'
    };
};

// ─── AI Chatbot ───────────────────────────────────────────
const chatWithAssistant = async (message, history = []) => {
    if (model) {
        try {
            const systemPrompt = `You are a compassionate and knowledgeable breast cancer awareness assistant. Your role is to:
- Answer questions about breast health, self-examination techniques, and cancer awareness
- Provide information about risk factors, prevention, and early detection
- Offer emotional support and encouragement
- Always include a disclaimer that you are not a substitute for professional medical advice
- Keep responses concise (2-4 paragraphs max)
- Use a warm, supportive, and professional tone
- Never diagnose — always recommend consulting a healthcare provider for concerns`;

            const chatHistory = history.map(h => ({
                role: h.role,
                parts: [{ text: h.content }]
            }));

            const chat = model.startChat({
                history: [
                    { role: 'user', parts: [{ text: systemPrompt }] },
                    { role: 'model', parts: [{ text: 'I understand. I\'m here to help with breast cancer awareness, provide information about self-examination, risk factors, and early detection. I\'ll always recommend consulting healthcare professionals for any concerns. How can I help you today?' }] },
                    ...chatHistory
                ]
            });

            const result = await chat.sendMessage(message);
            return { reply: result.response.text() };
        } catch (err) {
            console.error('Chat AI error:', err.message);
        }
    }

    return getFallbackChatResponse(message);
};

const getFallbackChatResponse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('self') && lower.includes('exam')) {
        return { reply: 'To perform a breast self-examination:\n\n1. **Stand in front of a mirror** — Look for changes in shape, size, or skin.\n2. **Raise your arms** — Check for the same changes.\n3. **Lie down** — Use your right hand to examine your left breast in a circular motion, covering the entire area. Then switch.\n4. **Check in the shower** — Wet skin makes it easier to feel for lumps.\n\nPerform this monthly. If you notice anything unusual, consult your doctor. *This is not medical advice — always seek professional guidance.*' };
    }
    if (lower.includes('risk') || lower.includes('factor')) {
        return { reply: 'Common breast cancer risk factors include:\n\n• **Age** — Risk increases with age, especially after 50\n• **Family history** — Having close relatives with breast cancer\n• **Genetics** — BRCA1 and BRCA2 gene mutations\n• **Lifestyle** — Lack of physical activity, alcohol use, obesity\n• **Hormonal** — Early menstruation, late menopause, hormone therapy\n\nHaving risk factors doesn\'t mean you will develop cancer. Regular screening is key! *Please consult your doctor for personalized advice.*' };
    }
    if (lower.includes('symptom') || lower.includes('sign')) {
        return { reply: 'Common signs and symptoms to watch for:\n\n• A new lump or mass in the breast or underarm\n• Change in breast size, shape, or appearance\n• Dimpling or puckering of breast skin\n• Nipple discharge (other than breast milk)\n• Redness or flaky skin around the nipple\n• Pain in any area of the breast\n\nMany of these can be caused by non-cancerous conditions, but it\'s important to have them evaluated. *Always consult a healthcare professional for proper diagnosis.*' };
    }
    if (lower.includes('prevent') || lower.includes('reduce')) {
        return { reply: 'While you can\'t completely prevent breast cancer, you can reduce your risk:\n\n• **Stay physically active** — At least 150 minutes of moderate exercise per week\n• **Maintain a healthy weight** — Especially after menopause\n• **Limit alcohol** — No more than one drink per day\n• **Breastfeed** if possible — It may lower risk\n• **Regular screening** — Mammograms as recommended by your doctor\n• **Know your family history** — Discuss genetic testing if needed\n\n*This information is for awareness purposes. Please consult your healthcare provider for personalized recommendations.*' };
    }
    return { reply: 'Thank you for your question! I\'m here to help with breast cancer awareness and early detection information.\n\nYou can ask me about:\n• **Self-examination techniques**\n• **Risk factors** for breast cancer\n• **Signs and symptoms** to watch for\n• **Prevention tips** and healthy lifestyle\n• **Screening recommendations**\n\n*Remember, I\'m an awareness tool — not a substitute for professional medical advice. Always consult your healthcare provider for personal health concerns.*' };
};

module.exports = { initAI, analyzeSymptoms, chatWithAssistant };

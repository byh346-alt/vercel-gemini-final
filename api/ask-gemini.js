const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: '질문(prompt)이 없습니다.' });
  }
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ answer: text });
  } catch (error) {
    console.error('API 호출 오류:', error);
    res.status(500).json({ error: 'AI 모델을 호출하는 데 실패했습니다.' });
  }
}
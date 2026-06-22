import ai from "../utills/Gemini.js"

export const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a helpful AI assistant.Always answer in English.User: ${message}`,
        });
        res.status(200).json({
            success: true,
            answer: response.text,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
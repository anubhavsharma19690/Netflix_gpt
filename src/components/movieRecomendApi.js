import axios from "axios";

const GEMINI_API_KEY = "AIzaSyApnbebIfcUnFPuau3D6cxjpbBmvpAY_OE"; // <-- Replace with your actual key
// const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // <-- Replace with your actual key

export async function generateContent(userPrompt) {
    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Suggest any 5 ${userPrompt} movies name only nothing else only names, return like this "Gadar, Golmaal,Koi Mil Gya, Sholay, Don"`,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": GEMINI_API_KEY,
                },
            }
        );

        console.log("Response:", response.data.candidates[0].content.parts[0].text);
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
    }
}
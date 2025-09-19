import axios from "axios";

export async function handler(event, context) {
    try {
        const { date } = event.queryStringParameters;

        if (!process.env.API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "API_KEY not set in environment variables" }),
            };
        }

        const response = await axios.get(
            "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON",
            {
                params: {
                    authkey: process.env.API_KEY,
                    searchdate: date,
                    data: "AP01",
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (err) {
        console.error("API 호출 실패:", err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}

import axios from "axios";

export async function handler(event, context) {
    const date = event.queryStringParameters.date;
    const apiKey = process.env.VITE_API_KEY; // Netlify 환경변수에 등록 필요

    try {
        const res = await axios.get(
            "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON",
            {
                params: {
                    authkey: apiKey,
                    searchdate: date,
                    data: "AP01",
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(res.data),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}

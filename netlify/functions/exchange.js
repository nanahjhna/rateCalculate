import axios from "axios";

export async function handler(event, context) {
    try {
        const { date } = event.queryStringParameters;

        // 실제 배포에서는 SSL 검증 켜기 (httpsAgent 제거)
        const response = await axios.get(
            "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON",
            {
                params: {
                    authkey: process.env.API_KEY, // Netlify Dashboard 환경변수
                    searchdate: date,
                    data: "AP01",
                },
                // maxRedirects 옵션은 기본값 5회 사용
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
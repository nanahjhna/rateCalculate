import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [rates, setRates] = useState([]);

    useEffect(() => {
        axios
            .get("/api/site/program/financial/exchangeJSON", {
                params: {
                    authkey: import.meta.env.VITE_API_KEY,
                    searchdate: "20250912",
                    data: "AP01",
                },
            })
            .then((res) => {
                // 전체 환율 데이터
                const data = res.data;

                // 일본(JPY)만 필터링
                const filtered = data.filter(
                    (rate) => rate.cur_unit === "JPY(100)"
                );

                // 화면에 보여줄 데이터 세팅
                setRates(filtered);
            })
            .catch((err) => console.error("API 에러:", err));
    }, []);

    return (
        <div className="w3-main" style={{ marginLeft: "340px", marginRight: "40px" }}>
            <h2>환율 정보</h2>
            <ul>
                {/* 원화는 기준 통화라 1원으로 고정 */}
                <li>대한민국 원 (KRW): 1원</li>
                {rates.map((rate, index) => (
                    <li key={index}>
                        {rate.cur_nm} ({rate.cur_unit}) : {rate.deal_bas_r}원
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;

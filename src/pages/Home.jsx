import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    // 오늘 날짜 YYYYMMDD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    };

    const today = formatDate(new Date());

    const [rates, setRates] = useState([]); // 전체 환율 데이터
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedCurrency, setSelectedCurrency] = useState("JPY(100)");

    // API 호출
    const fetchRates = async () => {
        try {
            const res = await axios.get(
                "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON",
                {
                    params: {
                        authkey: import.meta.env.VITE_API_KEY,
                        searchdate: selectedDate,
                        data: "AP01",
                    },
                }
            );
            setRates(res.data || []);
        } catch (err) {
            console.error("API 에러:", err);
            setRates([]); // 실패 시 빈 배열 처리
        }
    };

    useEffect(() => {
        fetchRates();
    }, [selectedDate]);

    const selectedRate = rates.find((rate) => rate.cur_unit === selectedCurrency);

    return (
        <div style={{ margin: "20px" }}>
            <h2>환율 정보</h2>

            {/* 날짜 선택 */}
            <div>
                <label>날짜 선택: </label>
                <input
                    type="date"
                    value={`${selectedDate.slice(0, 4)}-${selectedDate.slice(4, 6)}-${selectedDate.slice(6, 8)}`}
                    onChange={(e) => setSelectedDate(e.target.value.replace(/-/g, ""))}
                />
            </div>

            {/* 통화 선택 */}
            <div>
                <label>통화 선택: </label>
                <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    {rates.map((rate, idx) => (
                        <option key={idx} value={rate.cur_unit}>
                            {rate.cur_nm} ({rate.cur_unit})
                        </option>
                    ))}
                </select>
            </div>

            {/* 환율 정보 */}
            <table border="1" cellPadding="5" style={{ marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>통화명</th>
                        <th>매매기준율</th>
                        <th>살 때 (TTB)</th>
                        <th>팔 때 (TTS)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>대한민국 원 (KRW)</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    {selectedRate && (
                        <tr>
                            <td>{selectedRate.cur_nm} ({selectedRate.cur_unit})</td>
                            <td>{selectedRate.deal_bas_r}</td>
                            <td>{selectedRate.ttb}</td>
                            <td>{selectedRate.tts}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
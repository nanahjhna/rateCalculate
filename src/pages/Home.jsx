import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    };

    const today = formatDate(new Date());

    const [rates, setRates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedCurrency, setSelectedCurrency] = useState("JPY(100)");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRates = async () => {
        setLoading(true);
        setError(null);

        const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // 임시 프록시
        const apiUrl = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON";

        try {
            const res = await axios.get(proxyUrl + apiUrl, {
                params: {
                    authkey: import.meta.env.VITE_API_KEY,
                    searchdate: selectedDate,
                    data: "AP01",
                },
            });
            setRates(res.data || []);
        } catch (err) {
            console.error("API 에러:", err);
            setError("환율 정보를 가져오는 데 실패했습니다.");
            setRates([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, [selectedDate]);

    const selectedRate = rates.find((rate) => rate.cur_unit === selectedCurrency);

    return (
        <div className="w3-main" style={{ marginLeft: "340px", marginRight: "40px" }}>
            <div className="w3-container" style={{ marginTop: "80px" }} id="showcase">
                <h1 className="w3-jumbo"><b>환율 정보</b></h1>
                <hr style={{ width: "50px", border: "5px solid red" }} className="w3-round" />

                <label>날짜 선택: </label>
                <input
                    type="date"
                    value={`${selectedDate.slice(0, 4)}-${selectedDate.slice(4, 6)}-${selectedDate.slice(6, 8)}`}
                    onChange={(e) => setSelectedDate(e.target.value.replace(/-/g, ""))}
                />
            </div>

            <div className="w3-row-padding" style={{ marginTop: "20px" }}>
                <label>통화 선택: </label>
                <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    {rates.map((rate, index) => (
                        <option key={index} value={rate.cur_unit}>
                            {rate.cur_nm} ({rate.cur_unit})
                        </option>
                    ))}
                </select>
            </div>

            {loading && <p>환율 정보를 불러오는 중...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {selectedRate && !loading && !error && (
                <ul style={{ marginTop: "20px" }}>
                    <li>{selectedRate.cur_nm} ({selectedRate.cur_unit})</li>
                    <li>매매기준율: {selectedRate.deal_bas_r}원</li>
                    <li>살 때 (TTB, 전신환 매입율): {selectedRate.ttb}원</li>
                    <li>팔 때 (TTS, 전신환 매도율): {selectedRate.tts}원</li>
                </ul>
            )}
        </div>
    );
}

export default Home;

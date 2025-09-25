import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home() {
    // 날짜를 YYYYMMDD 형식으로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    };

    // 오늘 날짜를 기본값으로 설정
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rates, setRates] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("JPY(100)");

    // 날짜 변경 시마다 API 호출
    useEffect(() => {
        const formattedDate = formatDate(selectedDate);
        axios
            .get("/api/site/program/financial/exchangeJSON", {
                params: {
                    authkey: import.meta.env.VITE_API_KEY,
                    searchdate: formattedDate,
                    data: "AP01",
                },
            })
            .then((res) => {
                console.log("API 응답:", res.data);
                setRates(res.data);
            })
            .catch((err) => console.error("API 에러:", err));
    }, [selectedDate]);

    // 현재 선택된 통화의 환율 정보 찾기
    const selectedRate = rates.find((rate) => rate.cur_unit === selectedCurrency);

    return (
        <div className="w3-main" style={{ marginLeft: "340px", marginRight: "40px" }}>
            <div className="w3-container" style={{ marginTop: "80px" }}>
                <h1 className="w3-jumbo"><b>환율 정보</b></h1>
                <hr style={{ width: "50px", border: "5px solid red" }} className="w3-round" />

                {/* ✅ 항상 표시되는 달력 */}
                <div style={{ marginTop: "20px" }}>
                    <label><b>날짜 선택:</b></label>
                    <div style={{ marginTop: "10px" }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            inline // ✅ 항상 열려 있는 달력 UI
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                </div>
            </div>

            {/* ✅ 통화 선택 드롭다운 */}
            <div className="w3-row-padding" style={{ marginTop: "20px" }}>
                <label><b>통화 선택:</b></label>
                <select
                    style={{ marginLeft: "10px", padding: "5px" }}
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    {rates.map((rate) => (
                        <option key={rate.cur_unit} value={rate.cur_unit}>
                            {rate.cur_nm} ({rate.cur_unit})
                        </option>
                    ))}
                </select>
            </div>

            {/* ✅ 선택한 통화 환율 정보 */}
            {selectedRate && (
                <ul style={{ marginTop: "20px", fontSize: "18px" }}>
                    <li>
                        <b>{selectedRate.cur_nm} ({selectedRate.cur_unit})</b>
                    </li>
                    <li>매매기준율: {selectedRate.deal_bas_r}원</li>
                    <li>현찰 살 때: {selectedRate.ttb}원</li>
                    <li>현찰 팔 때: {selectedRate.tts}원</li>
                </ul>
            )}
        </div>
    );
}

export default Home;
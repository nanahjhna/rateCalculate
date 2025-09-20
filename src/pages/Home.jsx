import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    // 날짜를 YYYYMMDD 형식의 문자열로 변환하는 함수
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    };

    const today = formatDate(new Date());

    const [rates, setRates] = useState([]); // API로부터 받은 전체 환율 데이터
    const [selectedDate, setSelectedDate] = useState(today); // 사용자가 선택한 날짜
    const [selectedCurrency, setSelectedCurrency] = useState("JPY(100)"); // 사용자가 선택한 통화

    // selectedDate가 바뀔 때마다 API를 다시 호출합니다.
    useEffect(() => {
        if (!selectedDate) return;

        // 3단계에서 설정한 프록시를 사용하기 위해 '/api'로 시작하는 주소를 사용합니다.
        axios
            .get("/api/site/program/financial/exchangeJSON", {
                params: {
                    authkey: import.meta.env.VITE_API_KEY, // .env 파일의 API 키
                    searchdate: selectedDate,
                    data: "AP01",
                },
            })
            .then((res) => {
                console.log("API 응답 데이터:", res.data); // 데이터가 잘 오는지 콘솔에서 확인해보세요!
                setRates(res.data);
            })
            .catch((err) => console.error("API 에러:", err));
    }, [selectedDate]); // selectedDate가 변경될 때만 이 useEffect가 실행됩니다.

    // 전체 환율 데이터(rates)에서 현재 선택된 통화(selectedCurrency)의 정보만 찾습니다.
    const selectedRate = rates.find((rate) => rate.cur_unit === selectedCurrency);

    return (
        <div className="w3-main" style={{ marginLeft: "340px", marginRight: "40px" }}>
            <div className="w3-container" style={{ marginTop: "80px" }}>
                <h1 className="w3-jumbo"><b>환율 정보</b></h1>
                <hr style={{ width: "50px", border: "5px solid red" }} className="w3-round" />

                <div>
                    <label>날짜 선택: </label>
                    <input
                        type="date"
                        // input type="date"는 'YYYY-MM-DD' 형식을 사용하므로 변환해줍니다.
                        value={`${selectedDate.slice(0, 4)}-${selectedDate.slice(4, 6)}-${selectedDate.slice(6, 8)}`}
                        onChange={(e) => setSelectedDate(e.target.value.replace(/-/g, ""))}
                    />
                </div>
            </div>

            <div className="w3-row-padding" style={{ marginTop: "20px" }}>
                <label>통화 선택: </label>
                <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                    {/* rates 배열을 순회하며 option 태그를 만듭니다. */}
                    {rates.map((rate) => (
                        <option key={rate.cur_unit} value={rate.cur_unit}>
                            {rate.cur_nm} ({rate.cur_unit})
                        </option>
                    ))}
                </select>
            </div>

            {/* selectedRate에 데이터가 있을 때만 환율 정보를 보여줍니다. */}
            {selectedRate && (
                <ul style={{ marginTop: "20px" }}>
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
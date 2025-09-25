import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "./app.css";

const currencyToCountry = {
    "JPY(100)": "JP",
    "USD": "US",
    "KRW": "KR",
    "EUR": "DE",
    "CNY": "CN",
    "GBP": "GB",
};

function Home() {
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}${month}${day}`;
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rates, setRates] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("JPY(100)");
    const [holidays, setHolidays] = useState([]);
    const [countryCode, setCountryCode] = useState("JP");

    // ✅ 날짜 보정: 주말이면 가장 가까운 금요일로 변경
    const getAdjustedDate = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        if (day === 6) d.setDate(d.getDate() - 1); // 토요일 → 금요일
        if (day === 0) d.setDate(d.getDate() - 2); // 일요일 → 금요일
        return d;
    };

    // ✅ 환율 데이터 가져오기
    useEffect(() => {
        const adjustedDate = getAdjustedDate(selectedDate);
        const formattedDate = formatDate(adjustedDate);

        axios
            .get("/api/site/program/financial/exchangeJSON", {
                params: {
                    authkey: import.meta.env.VITE_API_KEY,
                    searchdate: formattedDate,
                    data: "AP01",
                },
            })
            .then((res) => setRates(res.data))
            .catch((err) => console.error("API 에러:", err));
    }, [selectedDate]);

    // ✅ 선택한 통화에 따라 국가 코드 변경
    useEffect(() => {
        const newCountry = currencyToCountry[selectedCurrency] || "US";
        setCountryCode(newCountry);
    }, [selectedCurrency]);

    // ✅ 국가 변경 시 공휴일 가져오기
    useEffect(() => {
        if (!countryCode) return;
        const currentYear = new Date().getFullYear();
        axios
            .get(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${countryCode}`)
            .then((res) => {
                const holidayDates = res.data.map((h) => new Date(h.date));
                setHolidays(holidayDates);
            })
            .catch((err) => console.error("공휴일 API 실패:", err));
    }, [countryCode]);

    const selectedRate = rates.find((rate) => rate.cur_unit === selectedCurrency);

    return (
        <div className="w3-main" style={{ marginLeft: "340px", marginRight: "40px" }}>
            <div className="w3-container" style={{ marginTop: "80px" }}>
                <h1 className="w3-jumbo"><b>환율 정보</b></h1>
                <hr style={{ width: "50px", border: "5px solid red" }} className="w3-round" />

                {/* 날짜 선택 달력 */}
                <div style={{ marginTop: "20px" }}>
                    <div style={{ marginTop: "10px" }}>
                        <DatePicker
                            locale={ko} // 한글
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            inline
                            maxDate={new Date()} // 미래 날짜 클릭 불가
                            dayClassName={(date) => {
                                const isHoliday = holidays.some(
                                    (h) =>
                                        h.getDate() === date.getDate() &&
                                        h.getMonth() === date.getMonth() &&
                                        h.getFullYear() === date.getFullYear()
                                );
                                if (isHoliday) return "holiday-day";
                                if (date.getDay() === 0) return "sunday";
                                if (date.getDay() === 6) return "saturday";
                                return undefined;
                            }}
                        />
                    </div>
                </div>

                {/* 통화 선택 */}
                <div className="w3-row-padding" style={{ marginTop: "20px" }}>
                    <select
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

                <div style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
                    현재 공휴일 기준: <b>{countryCode}</b>
                </div>

                {/* 환율 정보 */}
                {selectedRate && (
                    <ul style={{ marginTop: "20px", fontSize: "18px" }}>
                        <li><b>{selectedRate.cur_nm} ({selectedRate.cur_unit})</b></li>
                        <li>매매기준율: {selectedRate.deal_bas_r}원</li>
                        <li>현찰 살 때: {selectedRate.ttb}원</li>
                        <li>현찰 팔 때: {selectedRate.tts}원</li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Home;
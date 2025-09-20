import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Showcase from "./pages/Showcase";
import KakaoAd from "./components/KakaoAd"; // 👈 1. 방금 만든 KakaoAd 컴포넌트를 import 합니다.

function App() {
    // ... (나머지 코드는 그대로 둡니다) ...

    return (
        <Router>
            <div>
                {/* ... (Sidebar, Header, Overlay, Routes, Modal 등은 그대로 둡니다) ... */}

                {/* Footer */}
                <div
                    className="w3-light-grey w3-container w3-padding-32"
                    style={{ marginTop: "75px", paddingRight: "58px" }}
                >
                    <p className="w3-right">
                        {/* 👇 2. 원하는 위치에 KakaoAd 컴포넌트를 추가합니다. */}
                        <KakaoAd />

                        Powered by{" "}
                        <a
                            href="https://www.w3schools.com/w3css/default.asp"
                            title="W3.CSS"
                            target="_blank"
                            rel="noreferrer"
                            className="w3-hover-opacity"
                        >
                            w3.css
                        </a>
                    </p>
                </div>
            </div>
        </Router>
    );
}

export default App;
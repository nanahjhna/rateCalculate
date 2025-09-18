import React, { useState, useEffect } from "react";  // 👈 반드시 추가
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Showcase from "./pages/Showcase";
import KakaoAdfit from "./../KakaoAdfit";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImg, setModalImg] = useState("");
    const [caption, setCaption] = useState("");

    const onClick = (src, alt) => {
        setModalImg(src);
        setCaption(alt);
        setModalOpen(true);
    };

    return (
        <Router>
            <div>
                {/* Sidebar/menu */}
                <nav
                    className="w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding"
                    style={{
                        zIndex: 3,
                        width: "300px",
                        fontWeight: "bold",
                        display: sidebarOpen ? "block" : "none",
                    }}
                >
                    <br />
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="w3-button w3-hide-large w3-display-topleft"
                        style={{ width: "100%", fontSize: "22px" }}
                    >
                        Close Menu
                    </button>
                    <div className="w3-container">
                        <h3 className="w3-padding-64">
                            <b>
                                For Your Info
                            </b>
                        </h3>
                    </div>
                    <div className="w3-bar-block">
                        <Link
                            to="/"
                            className="w3-bar-item w3-button w3-hover-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/Showcase"
                            className="w3-bar-item w3-button w3-hover-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            Showcase
                        </Link>
                        
                    </div>
                </nav>

                {/* Top menu on small screens */}
                <header className="w3-container w3-top w3-hide-large w3-red w3-xlarge w3-padding">
                    <button
                        className="w3-button w3-red w3-margin-right"
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    <span>For Your Info</span>
                </header>

                {/* Overlay */}
                {sidebarOpen && (
                    <div
                        className="w3-overlay w3-hide-large"
                        style={{ cursor: "pointer", display: "block" }}
                        onClick={() => setSidebarOpen(false)}
                        title="close side menu"
                        id="myOverlay"
                    ></div>
                )}

                {/* Routes */}
                <Routes>
                    <Route path="/" element={<Home onImageClick={onClick} />} />
                    <Route path="/Showcase" element={<Showcase onImageClick={onClick} />} />
                </Routes>

                {/* Modal */}
                {modalOpen && (
                    <div
                        id="modal01"
                        className="w3-modal w3-black"
                        style={{ paddingTop: 0, display: "block" }}
                        onClick={() => setModalOpen(false)}
                    >
                        <span
                            className="w3-button w3-black w3-xxlarge w3-display-topright"
                            onClick={() => setModalOpen(false)}
                        >
                            ×
                        </span>
                        <div className="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
                            <img id="img01" className="w3-image" src={modalImg} alt={caption} />
                            <p id="caption">{caption}</p>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div
                    className="w3-light-grey w3-container w3-padding-32"
                    style={{ marginTop: "75px", paddingRight: "58px" }}
                >
                    <p className="w3-right">
                        {/* 카카오 애드핏 광고 */}
                        <KakaoAdfit />
                    </p>
                </div>
            </div>
        </Router>
    );
}

export default App;
// src/pages/showcase.jsx
import React, { useState, useEffect } from "react";  // 👈 반드시 추가

function Showcase({ onImageClick }) {
    return (
        <div className="w3-main" style={{ marginLeft: "340px", marginRight: "40px" }}>
            {/* Header */}
            <div className="w3-container" style={{ marginTop: "80px" }} id="showcase">
                <h1 className="w3-jumbo"><b>Showcase 페이지</b></h1>
                <h1 className="w3-xxxlarge w3-text-red"><b>Showcase.</b></h1>
                <hr style={{ width: "50px", border: "5px solid red" }} className="w3-round" />
            </div>

            {/* Photo grid */}
            <div className="w3-row-padding">
                <div className="w3-half">
                    여기에 원하는 콘텐츠를 넣을 수 있습니다.
                </div>
                <div className="w3-half">
                </div>
            </div>
        </div>
    );
}

export default Showcase;
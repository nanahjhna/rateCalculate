import React, { useEffect } from "react";

const KakaoAdfit = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-OJQ9ukmkWGqkFdsV"
            data-ad-width="320"
            data-ad-height="50"
        />
    );
};

export default KakaoAdfit;

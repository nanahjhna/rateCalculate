import React, { useEffect } from 'react';

const KakaoAd = () => {
    useEffect(() => {
        // script 태그를 동적으로 생성합니다.
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
        script.async = true;

        // document.body에 스크립트를 추가합니다.
        document.body.appendChild(script);

        // 컴포넌트가 언마운트될 때 스크립트를 제거하는 클린업 함수입니다.
        // 다른 페이지로 이동할 때 스크립트가 중복으로 쌓이는 것을 방지합니다.
        return () => {
            document.body.removeChild(script);
        };
    }, []); // []를 의존성 배열로 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 합니다.

    return (
        <ins
            className="kakao_ad_area"
            style={{ display: 'none' }}
            data-ad-unit="DAN-OJQ9ukmkWGqkFdsV"
            data-ad-width="300"
            data-ad-height="250"
        ></ins>
    );
};

export default KakaoAd;
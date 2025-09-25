"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        window.kakao.maps.load(() => {
          initMap();
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    // 지도 중심 좌표 (예: 서울 강남구)
    const center = new window.kakao.maps.LatLng(37.5665, 126.978);

    // 지도 옵션
    const options = {
      center: center,
      level: 3,
      draggable: true,
      scrollwheel: true,
      disableDoubleClick: false,
      disableDoubleClickZoom: false,
    };

    // 지도 생성
    const map = new window.kakao.maps.Map(mapRef.current, options);

    // 마커 생성
    const markerPosition = center;
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도에 표시
    marker.setMap(map);

    // 커스텀 오버레이 생성 (정보창)
    const content = `
      <div class="p-4 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
        <div class="text-sm font-semibold text-gray-800 mb-2">회사 위치</div>
        <div class="text-xs text-gray-600 mb-1">서울특별시 강남구</div>
        <div class="text-xs text-gray-600">테헤란로 123</div>
        <div class="mt-2">
          <button class="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
            길찾기
          </button>
        </div>
      </div>
    `;

    const overlay = new window.kakao.maps.CustomOverlay({
      content: content,
      position: markerPosition,
      yAnchor: 1,
    });

    // 오버레이를 지도에 표시
    overlay.setMap(map);

    // 마커 클릭 이벤트
    window.kakao.maps.event.addListener(marker, "click", () => {
      if (overlay.getMap()) {
        overlay.setMap(null);
      } else {
        overlay.setMap(map);
      }
    });
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            오시는 길
          </h2>
        </div>

        {/* 지도 컨테이너 */}
        <div className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* 지도 영역 */}
            <div className="relative">
              <div
                ref={mapRef}
                className="w-full h-[500px] lg:h-[600px]"
                style={{ minHeight: "500px" }}
              />

              {/* 지도 로딩 오버레이 */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                id="map"
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2mx-auto mb-4"></div>
                  <p className="text-gray-600">지도를 불러오는 중...</p>
                </div>
              </div>
            </div>

            {/* 정보 영역 */}
            <div className="p-8 lg:p-12 bg-gradient-to-br">
              <div className="space-y-8">
                {/* 기본 정보 */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    위치 정보
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">주소</p>
                        <p className="text-gray-600">자양동 661-30</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">운영시간</p>
                        <p className="text-gray-600">평일 09:00 - 18:00</p>
                        <p className="text-gray-600">토요일 09:00 - 13:00</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">연락처</p>
                        <p className="text-gray-600">02-1234-5678</p>
                        <p className="text-gray-600">contact@company.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 교통편 안내 */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    교통편 안내
                  </h4>
                  <div className="space-y-3">
                    {" "}
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <p className="text-gray-700">
                        지하철 2호선 구의역 4번 출구 도보 10분
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">B</span>
                      </div>
                      <p className="text-gray-700">
                        성자초등학교앞 정거장 맞은편 도보 1분
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

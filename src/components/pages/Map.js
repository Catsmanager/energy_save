import React, { useEffect, useState } from 'react';

// 의류 수거함 데이터를 JSON 파일로 불러옵니다.
import aWasteBins from '../data/aWasteBins.json'; 
import bWasteBins from '../data/bWasteBins.json'; 
import cWasteBins from '../data/cWasteBins.json'; 

const Map = () => { // 수거함 가시성을 관리하는 상태 변수를 설정합니다.
  const [isAWasteBinVisible, setIsAWasteBinVisible] = useState(false); 
  const [isBWasteBinVisible, setIsBWasteBinVisible] = useState(false); 
  const [isCWasteBinVisible, setIsCWasteBinVisible] = useState(false); 
  useEffect(() => {

    const script = document.createElement('script');
    // Kakao 지도 SDK를 비동기적으로 로드합니다.
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff20f49c0e3e497ad3a297a4cf9ac213&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao 지도 API가 로드된 후 실행됩니다.
      window.kakao.maps.load(() => {
        const defaultPosition = {//시작위치
          lat: 37.4020589, // 시작 위치의 위도
          lng: 127.1064401, // 시작 위치의 경도
        };

        // 지도 요소를 가져옵니다.
        const $map = document.getElementById('map');
        // 지도를 생성합니다.
        const mapContainer = new window.kakao.maps.Map($map, {
          center: new window.kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng),
          level: 4,
        });
        // 마커 이미지를 생성하는 함수입니다.
        const createMarkerImage = () => {
          const markerImageSrc = '/marker.png'; // 마커 이미지 경로
          const imageSize = new window.kakao.maps.Size(30, 46); // 마커 크기
          return new window.kakao.maps.MarkerImage(markerImageSrc, imageSize);
        };

        // 마커를 생성하는 함수입니다.
        const createMarker = (lat, lng) => {
          const marker = new window.kakao.maps.Marker({
            map: mapContainer, 
            position: new window.kakao.maps.LatLng(lat, lng), 
            image: createMarkerImage(), 
          });
          return marker;
        };
        // 수거함을 지도에 표시하는 함수입니다.
        const displayWasteBins = (wasteBins) => {
          wasteBins.map((bin) => {
            const { lat, lng, name } = bin; // 각 수거함의 위도, 경도, 이름을 가져옵니다.
            const marker = createMarker(lat, lng); // 마커 생성
            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div><strong>${name}</strong></div>`,  // 정보 창 내용
            });
            infoWindow.open(mapContainer, marker); // 마커에 정보 창을 엽니다.
          });
        };

        // 각 수거함 가시성 상태에 따라 수거함을 표시합니다.
        if (isAWasteBinVisible) displayWasteBins(aWasteBins);
        if (isBWasteBinVisible) displayWasteBins(bWasteBins);
        if (isCWasteBinVisible) displayWasteBins(cWasteBins);

        // 내 위치 찾기 기능
        const successGeo = (position) => {
          const { latitude, longitude } = position.coords; // 위치 정보 가져오기
          mapContainer.setCenter(new window.kakao.maps.LatLng(latitude, longitude));  // 지도의 중심을 내 위치로 설정
          createMarker(latitude, longitude);  // 내 위치에 마커 생성
        };

        const errorGeo = (error) => {
          // 위치 정보 요청에 대한 오류 처리
          switch (error.code) {
            case 1:
              alert('위치 정보를 허용해주세요.');
              break;
            case 2:
              alert('사용할 수 없는 위치입니다.');
              break;
            case 3:
              alert('타임아웃이 발생하였습니다.');
              break;
            default:
              alert('오류가 발생하였습니다.');
          }
        };
        // 위치 정보를 가져오는 함수입니다.
        const getLocation = () => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(successGeo, errorGeo); // 위치 정보 요청
          } else {
            alert('내 위치 찾기 기능을 사용할 수 없습니다.');
          }
        };

        // 내 위치 찾기 버튼 클릭 이벤트 리스너 등록
        document.querySelector('.geolocation_button').addEventListener('click', getLocation);
      });
    };
  }, [isAWasteBinVisible, isBWasteBinVisible, isCWasteBinVisible]);  // 상태가 변경될 때마다 useEffect 실행

  return (
    <div>
      {/* A수거함 버튼 */}
      <button
        className="toggle-waste-bin-layer-button"
        onClick={() => setIsAWasteBinVisible(!isAWasteBinVisible)}
      >
        <span className="icon text-white-50">
          <i className={`fas ${isAWasteBinVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </span>
        <span className="text">{isAWasteBinVisible ? 'A수거함 숨기기' : 'A수거함 보기'}</span>
      </button>

      {/* B */}
      <button
        className="toggle-waste-bin-layer-button"
        onClick={() => setIsBWasteBinVisible(!isBWasteBinVisible)}
      >
        <span className="icon text-white-50">
          <i className={`fas ${isBWasteBinVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </span>
        <span className="text">{isBWasteBinVisible ? 'B수거함 숨기기' : 'B수거함 보기'}</span>
      </button>

      {/* C*/}
      <button
        className="toggle-waste-bin-layer-button"
        onClick={() => setIsCWasteBinVisible(!isCWasteBinVisible)}
      >
        <span className="icon text-white-50">
          <i className={`fas ${isCWasteBinVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </span>
        <span className="text">{isCWasteBinVisible ? 'C수거함 숨기기' : 'C수거함 보기'}</span>
      </button>


      <button className="geolocation_button">
        내 위치 찾기
      </button>

      <div
        id="map"
        style={{
          width: '100%',
          height: '700px',
        }}
      ></div>
    </div>
  );
};

export default Map;
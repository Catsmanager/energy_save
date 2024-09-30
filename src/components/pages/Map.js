import React, { useEffect, useState } from 'react';

import aWasteBins from '../data/aWasteBins.json'; 
import bWasteBins from '../data/bWasteBins.json'; 
import cWasteBins from '../data/cWasteBins.json'; 

const Map = () => {
  const [isAWasteBinVisible, setIsAWasteBinVisible] = useState(false); 
  const [isBWasteBinVisible, setIsBWasteBinVisible] = useState(false); 
  const [isCWasteBinVisible, setIsCWasteBinVisible] = useState(false); 
  useEffect(() => {

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff20f49c0e3e497ad3a297a4cf9ac213&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const defaultPosition = {//시작위치
          lat: 37.4020589,
          lng: 127.1064401,
        };

        const $map = document.getElementById('map');
        const mapContainer = new window.kakao.maps.Map($map, {
          center: new window.kakao.maps.LatLng(defaultPosition.lat, defaultPosition.lng),
          level: 4,
        });

        const createMarkerImage = () => {
          const markerImageSrc = './assets/marker.png';
          const imageSize = new window.kakao.maps.Size(30, 46);
          return new window.kakao.maps.MarkerImage(markerImageSrc, imageSize);
        };

        const createMarker = (lat, lng) => {
          const marker = new window.kakao.maps.Marker({
            map: mapContainer, 
            position: new window.kakao.maps.LatLng(lat, lng), 
            image: createMarkerImage(), 
          });
          return marker;
        };

        const displayWasteBins = (wasteBins) => {
          wasteBins.map((bin) => {
            const { lat, lng, name } = bin;
            const marker = createMarker(lat, lng);
            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div><strong>${name}</strong></div>`,
            });
            infoWindow.open(mapContainer, marker);
          });
        };

       
        if (isAWasteBinVisible) displayWasteBins(aWasteBins);
        
        if (isBWasteBinVisible) displayWasteBins(bWasteBins);
        
        if (isCWasteBinVisible) displayWasteBins(cWasteBins);

        // 내 위치 찾기 기능
        const successGeo = (position) => {
          const { latitude, longitude } = position.coords;
          mapContainer.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
          createMarker(latitude, longitude); 
        };

        const errorGeo = (error) => {
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

        const getLocation = () => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
          } else {
            alert('내 위치 찾기 기능을 사용할 수 없습니다.');
          }
        };


        document.querySelector('.geolocation_button').addEventListener('click', getLocation);
      });
    };
  }, [isAWasteBinVisible, isBWasteBinVisible, isCWasteBinVisible]); 

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


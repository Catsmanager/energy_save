import React, { useEffect, useState } from 'react';

// 의류 수거함 데이터를 JSON 파일로 불러옵니다.
import aWasteBins from '../data/aWasteBins.json'; 
import bWasteBins from '../data/bWasteBins.json'; 
import cWasteBins from '../data/cWasteBins.json'; 

import '../styles/Map.css';

// 서울 구 목록 및 좌표 정보
const seoulDistricts = [
  { name: '강서구', lat: 37.550925, lng: 126.849537 },
  { name: '강남구', lat: 37.517236, lng: 127.047325 },
  { name: '서초구', lat: 37.483571, lng: 127.032653 },
  { name: '종로구', lat: 37.573050, lng: 126.979189 },
  { name: '마포구', lat: 37.566324, lng: 126.901644 },
  // 추가 구 정보 ...
];

const Map = () => {
  const [isAWasteBinVisible, setIsAWasteBinVisible] = useState(false); 
  const [isBWasteBinVisible, setIsBWasteBinVisible] = useState(false); 
  const [isCWasteBinVisible, setIsCWasteBinVisible] = useState(false); 
  const [markers, setMarkers] = useState([]);  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(seoulDistricts[0]); // 초기 구 선택
  const [mapInstance, setMapInstance] = useState(null); // 지도 인스턴스를 저장할 상태

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=ff20f49c0e3e497ad3a297a4cf9ac213&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const $map = document.getElementById('map');
        const mapContainer = new window.kakao.maps.Map($map, {
          center: new window.kakao.maps.LatLng(selectedDistrict.lat, selectedDistrict.lng), // 구의 초기 위치 설정
          level: 4,
        });

        setMapInstance(mapContainer); // 지도의 인스턴스를 상태에 저장

        const ZOOM_THRESHOLD = 5; 

        const createMarkerImage = () => {
          const markerImageSrc = '/marker.png';
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
          const newMarkers = wasteBins.map((bin) => {
            const { lat, lng, name } = bin;
            const marker = createMarker(lat, lng);
            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div><strong>${name}</strong></div>`,
            });
            infoWindow.open(mapContainer, marker);
            return marker;
          });
          setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
        };

        const toggleMarkersByZoom = () => {
          const currentZoom = mapContainer.getLevel();
          markers.forEach(marker => {
            if (currentZoom > ZOOM_THRESHOLD) {
              marker.setMap(null);
            } else {
              marker.setMap(mapContainer);
            }
          });
        };

        window.kakao.maps.event.addListener(mapContainer, 'zoom_changed', toggleMarkersByZoom);

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
  }, [isAWasteBinVisible, isBWasteBinVisible, isCWasteBinVisible, selectedDistrict, markers]);

  // 구 선택 시 해당 구의 좌표로 이동
  const handleDistrictChange = (event) => {
    const selected = seoulDistricts.find(district => district.name === event.target.value);
    setSelectedDistrict(selected);
    if (mapInstance) {
      mapInstance.setCenter(new window.kakao.maps.LatLng(selected.lat, selected.lng));
    }
  };

  // 지역 검색 기능 구현
  const searchLocation = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchQuery, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstance.setCenter(coords); // 지도 중심을 검색된 위치로 이동
      } else {
        alert('검색된 지역이 없습니다.');
      }
    });
  };

  return (
      <div>
        {/* 구 선택과 검색창을 나란히 배치하는 컨테이너 */}
        <div className="district-search-container">
          {/* 구 선택 드롭다운 */}
          <div className="district-select-container">
            
            <select id="district-select" onChange={handleDistrictChange}>
              {seoulDistricts.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
    
          {/* 지역 검색 기능 */}
          <div className="search-container">
            <input
              type="text"
              placeholder="지역을 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button onClick={searchLocation} className="search-button">
              검색
            </button>
          </div>
        </div>
    
        {/* 수거함 토글 버튼 및 지도 */}
        <button className="toggle-waste-bin-layer-button" onClick={() => setIsAWasteBinVisible(!isAWasteBinVisible)}>
          <span className="icon text-white-50">
            <i className={`fas ${isAWasteBinVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
          <span className="text">{isAWasteBinVisible ? 'A수거함 숨기기' : 'A수거함 보기'}</span>
        </button>
    
        <button className="toggle-waste-bin-layer-button" onClick={() => setIsBWasteBinVisible(!isBWasteBinVisible)}>
          <span className="icon text-white-50">
            <i className={`fas ${isBWasteBinVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
          <span className="text">{isBWasteBinVisible ? 'B수거함 숨기기' : 'B수거함 보기'}</span>
        </button>
    
        <button className="toggle-waste-bin-layer-button" onClick={() => setIsCWasteBinVisible(!isCWasteBinVisible)}>
          <span className="icon text-white-50">
            <i className={`fas ${isCWasteBinVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </span>
          <span className="text">{isCWasteBinVisible ? 'C수거함 숨기기' : 'C수거함 보기'}</span>
        </button>
    
        <button className="geolocation_button">내 위치 찾기</button>
    
        <div id="map" style={{ width: '100%', height: '700px' }}></div>
      </div>
    );
};

export default Map;

